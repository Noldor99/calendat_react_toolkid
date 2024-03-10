import { FC } from "react"
import { useForm } from "react-hook-form"

import FormInput from "@/components/form/FormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod"

import { EventSchema, IEventSchema } from "@/shema/eventSchema"

import { useTypedDispatch } from "@/hook/useTypedDispatch"
import dayjs from "dayjs"
import LabelsForm from "./LabelsForm"
import { IEvent } from "@/types/event"

type EventFormPropsType = {
  event?: IEvent
  day?: dayjs.Dayjs
  handleClose: () => void
}

export const EventForm: FC<EventFormPropsType> = (
  props: EventFormPropsType
) => {
  const { event, day, handleClose } = props

  const form = useForm<IEventSchema>({
    mode: "onChange",
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      label: event?.label || "",
      daySelected: event?.daySelected || day,
    },
  })

  const { formState, handleSubmit } = form

  const { addEvent, updateEvent } = useTypedDispatch()

  function onSubmit(data: IEventSchema) {
    const changedFields: IEventSchema = Object.keys(data).reduce(
      (result, key) => {
        const value = data[key as keyof IEventSchema]

        if (value instanceof Date) {
          result[key as keyof Omit<IEventSchema, "daySelected">] =
            value.toISOString()
        } else {
          result[key as keyof IEventSchema] =
            value as IEventSchema[keyof IEventSchema]
        }

        return result
      },
      {} as IEventSchema
    )
    event
      ? //@ts-ignore
        updateEvent({ ...changedFields, id: event.id })
      : //@ts-ignore
        addEvent(changedFields)

    handleClose()
    toast({ title: "Success", description: "success" })
  }

  return (
    <div className="my-2  flex items-center justify-center gap-2">
      <Form {...form}>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start justify-between gap-4">
            <FormInput name="title" placeholder="Title" />
            <FormInput name="description" placeholder="Description" />
            <LabelsForm name="label" label={event?.label || ""} />
            {day ? day : event?.daySelected}
          </div>

          <div className="mt-[20px] flex max-w-[800px] justify-between">
            <Button
              type="button"
              onClick={() => handleClose()}
              variant="default_out"
            >
              Cansel
            </Button>

            <Button
              type="submit"
              disabled={
                !formState.isValid ? true : formState.isDirty ? false : true
              }
            >
              Save event
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
