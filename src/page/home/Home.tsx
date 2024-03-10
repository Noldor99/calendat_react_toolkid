import { DialogEventForm } from "@/components/dialogFormEvent/DialogEnvetForm"
import CalendarHeader from "./_components/CalendarHeader"
import { useEffect, useState } from "react"
import { getMonth } from "@/utils/util"
import { useTypedSelector } from "@/hook/useTypedSelector"
import Month from "./_components/Month"
import Labels from "./_components/Labels"
import { useTypedDispatch } from "@/hook/useTypedDispatch"
import { useGetHoliday } from "@/ahooks/useHoliday"
import { holidayData } from "@/data"

const Home = () => {
  const { monthIndex, yera } = useTypedSelector((state) => state.calendar)
  const {
    data: holiday,
    isFetched,
    refetch,
  } = useGetHoliday({
    year: yera,
  })
  console.log(holiday)

  const [currenMonth, setCurrentMonth] = useState(getMonth())

  const { events } = useTypedSelector((s) => s.event)
  const { filterLabels, searchText } = useTypedSelector((s) => s.filter)
  const { updateFilterLabels, updateFilterEvents, setYear } = useTypedDispatch()

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
    setYear()
  }, [monthIndex])

  useEffect(() => {
    refetch()
  }, [yera])

  useEffect(() => {
    updateFilterLabels()
  }, [events])

  useEffect(() => {
    updateFilterEvents()
  }, [filterLabels, searchText])

  return (
    <div className="container">
      <div className="paper-sharp">
        <CalendarHeader />
        <Labels />
        <DialogEventForm />
        <Month
          month={currenMonth}
          holidaysData={holiday ? holiday : holidayData}
        />
      </div>
    </div>
  )
}

export default Home
