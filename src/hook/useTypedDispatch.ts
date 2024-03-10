import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { calendarAction } from "@/store/slice/calendarSlice"
import { eventActions } from "@/store/slice/eventSlice"
import { filterActions } from "@/store/slice/filterSlice"

const actions = {
  ...calendarAction,
  ...eventActions,
  ...filterActions,
}

export const useTypedDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
