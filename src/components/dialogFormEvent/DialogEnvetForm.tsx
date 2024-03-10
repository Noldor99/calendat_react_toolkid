import { EventForm } from "./EventForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useTypedSelector } from "@/hook/useTypedSelector"
import { useTypedDispatch } from "@/hook/useTypedDispatch"

export function DialogEventForm() {
  const { daySelected, showEventModal } = useTypedSelector((s) => s.calendar)
  const { selectedEvent } = useTypedSelector((s) => s.event)
  const { setShowEventModal } = useTypedDispatch()

  const handleOpenChange = () => {
    setShowEventModal(!showEventModal)
  }

  return (
    <Dialog open={showEventModal} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-h2 mb-3 text-center font-normal">
            {selectedEvent ? "Edit event" : "Create new event"}
          </DialogTitle>
        </DialogHeader>
        {selectedEvent ? (
          <EventForm event={selectedEvent} handleClose={handleOpenChange} />
        ) : (
          <EventForm handleClose={handleOpenChange} day={daySelected} />
        )}
      </DialogContent>
    </Dialog>
  )
}
