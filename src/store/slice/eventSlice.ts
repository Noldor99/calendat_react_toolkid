import { IEvent } from "@/types/event";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export interface IFilterLabel {
  label: string;
  checked: boolean;
}

interface IEventState {
  events: IEvent[];
  selectedEvent: null | IEvent;
}

const saveToLocalStorage = (events: IEvent[]) => {
  localStorage.setItem("events", JSON.stringify(events));
};

const initialState: IEventState = {
  events: JSON.parse(localStorage.getItem("events") || "[]"),
  selectedEvent: null,

};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent(state, { payload }: PayloadAction<IEvent>) {
      const newEvent = { ...payload, id: uuidv4() };
      state.events.push(newEvent);
      saveToLocalStorage(state.events);
    },
    updateEvent(state, { payload }: PayloadAction<IEvent>) {
      const index = state.events.findIndex((event) => event.id === payload.id);
      if (index !== -1) {
        state.events[index] = payload;
        saveToLocalStorage(state.events);
      }
    },
    deleteEvent(state, { payload }: PayloadAction<string>) {
      state.events = state.events.filter((event) => event.id !== payload);
      saveToLocalStorage(state.events);
    },
    setSelectedEvent: (state, action) => {
      const selectedEvent = action.payload;
      state.selectedEvent = selectedEvent;
    },
  },
});

export const eventActions = eventSlice.actions;
export const eventReducer = eventSlice.reducer;


