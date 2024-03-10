import React from "react"
import Day from "./Day"
import { Dayjs } from "dayjs"
import { IHolidays } from "@/types/holiday"

interface MonthProps {
  month: Dayjs[][]
  holidaysData: IHolidays
}

export default function Month({ month, holidaysData }: MonthProps) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => {
            const holiday = holidaysData.find(
              (holiday) => holiday.date === day.format("YYYY-MM-DD")
            )
            return (
              <>
                <Day
                  day={day}
                  key={idx}
                  rowIdx={i}
                  holidayName={holiday?.name}
                  isCurrentMonth={!day.isSame(new Date(), "month")}
                />
              </>
            )
          })}
        </React.Fragment>
      ))}
    </div>
  )
}
