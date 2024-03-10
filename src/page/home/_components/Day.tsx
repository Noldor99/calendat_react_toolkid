import { useTypedDispatch } from "@/hook/useTypedDispatch"
import { useTypedSelector } from "@/hook/useTypedSelector"
import { IEvent } from "@/types/event"
import { IconHttpDelete } from "@tabler/icons-react"

import dayjs from "dayjs"
import { useState, useEffect, useRef } from "react"

interface DayProps {
  day: dayjs.Dayjs
  rowIdx: number
  holidayName?: string
  isCurrentMonth: boolean
}

export default function Day({
  day,
  rowIdx,
  holidayName,
  isCurrentMonth,
}: DayProps) {
  const [dayEvents, setDayEvents] = useState<IEvent[] | []>([])

  const { events: eventsAll } = useTypedSelector((s) => s.event)
  const { filterEvents } = useTypedSelector((s) => s.filter)
  const { setDaySelected, setSelectedEvent, setShowEventModal, deleteEvent } =
    useTypedDispatch()

  useEffect(() => {
    const reultEvents = filterEvents ? filterEvents : eventsAll

    const events = reultEvents?.filter(
      (evt) =>
        dayjs(evt.daySelected).format("DD-MM-YY") === day.format("DD-MM-YY")
    )
    if (events) setDayEvents(events)
  }, [filterEvents, day, eventsAll])

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : ""
  }

  const dragPerson = useRef<number>(0)
  const draggedOverPerson = useRef<number>(0)

  function handleSort() {
    const eventClone = [...dayEvents]
    const temp = eventClone[dragPerson.current]
    eventClone[dragPerson.current] = eventClone[draggedOverPerson.current]
    eventClone[draggedOverPerson.current] = temp
    setDayEvents(eventClone)
  }

  return (
    <div
      className={`border border-gray-200 flex flex-col ${
        isCurrentMonth ? "" : "bg-gray-100"
      }`}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day)
          setSelectedEvent(null)
          setShowEventModal(true)
        }}
      >
        {holidayName && (
          <div className="bg-yellow-200 p- mx-3 text-gray-600 text-sm rounded mb-1 truncate">
            {holidayName}
          </div>
        )}
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedEvent(evt)
              setShowEventModal(true)
            }}
            className={`bg-${evt.label}-200 p-1 mx-3 text-gray-600 text-sm rounded mb-1 truncate`}
            draggable
            onDragStart={() => (dragPerson.current = idx)}
            onDragEnter={() => (draggedOverPerson.current = idx)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <p> {evt.title}</p>
            <div
              className="width-[15px] border rounded-[10px]"
              onClick={(e) => {
                e.stopPropagation()
                deleteEvent(evt.id)
              }}
            >
              <IconHttpDelete />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
