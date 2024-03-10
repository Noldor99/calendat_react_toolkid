import { IconCheck } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"]

interface LabelsFormProps {
  name: string
  label: string
}

const LabelsForm = ({ name, label }: LabelsFormProps) => {
  const { setValue, watch } = useFormContext()
  const [selectedLabel, setSelectedLabel] = useState(
    label ? label : labelsClasses[0]
  )

  const handleLabelClick = (lblClass: string) => {
    setSelectedLabel(lblClass)
  }

  useEffect(() => {
    setValue(name, selectedLabel)
  }, [selectedLabel])

  return (
    <div className="flex gap-x-2">
      {labelsClasses.map((lblClass, i) => (
        <span
          key={i}
          onClick={() => handleLabelClick(lblClass)}
          className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
        >
          {selectedLabel === lblClass && (
            <span className="material-icons-outlined text-white text-sm">
              <IconCheck />
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

export default LabelsForm
