import React from "react"
import { useTypedDispatch } from "@/hook/useTypedDispatch"
import { useTypedSelector } from "@/hook/useTypedSelector"

export default function Labels() {
  const { filterLabels } = useTypedSelector((s) => s.filter)
  const { updateFilterLabelsById } = useTypedDispatch()

  return (
    <div className="flex items-center paper-rounded   my-5">
      <p className="text-gray-500 text-h3 font-bold mr-5">Label:</p>
      {filterLabels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="flex items-center justify-center  mr-5">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateFilterLabelsById(lbl)}
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </div>
  )
}
