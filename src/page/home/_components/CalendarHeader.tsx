import dayjs from "dayjs"
import { useTypedDispatch } from "@/hook/useTypedDispatch"
import { useTypedSelector } from "@/hook/useTypedSelector"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import SearchComponent from "@/components/SearchComponent"
export default function CalendarHeader() {
  const { monthIndex } = useTypedSelector((state) => state.calendar)
  const { setMonthIndex } = useTypedDispatch()

  function handlePrevMonth() {
    setMonthIndex({ monthIndex: monthIndex - 1 })
  }
  function handleNextMonth() {
    setMonthIndex({ monthIndex: monthIndex + 1 })
  }
  function handleReset() {
    setMonthIndex({ monthIndex: dayjs().month() })
  }
  return (
    <header className="paper-rounded my-2 flex items-center">
      <h1 className="mr-10 text-h1 text-gray-500 fond-bold">Calendar</h1>
      <Button onClick={handleReset} className="border rounded   px-4 mr-5">
        Today
      </Button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <IconChevronLeft />
        </span>
      </button>
      <h2 className=" text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <IconChevronRight />
        </span>
      </button>
      <div className="ml-auto">
        <SearchComponent />
      </div>
    </header>
  )
}
