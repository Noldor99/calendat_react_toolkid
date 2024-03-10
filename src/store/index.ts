import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { calendarReducer } from "./slice/calendarSlice"
import { eventReducer } from "./slice/eventSlice"
import { filterReducer } from "./slice/filterSlice"

const rootReducer = combineReducers({
  calendar: calendarReducer,
  event: eventReducer,
  filter: filterReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
    }),
  devTools: true,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
