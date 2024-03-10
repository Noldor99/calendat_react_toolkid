import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface ICalendarState {
  daySelected: dayjs.Dayjs;
  monthIndex: number;
  yera: number;
  showEventModal: boolean
}

const initialState: ICalendarState = {
  daySelected: dayjs(),
  monthIndex: dayjs().month(),
  yera: 2024,
  showEventModal: false
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setYear: (state) => {
      state.yera = +dayjs(new Date(dayjs().year(), state.monthIndex)).format("YYYY");
    },
    setMonthIndex: (state, { payload }) => {
      const { monthIndex } = payload;

      state.monthIndex = monthIndex;
    },
    setDaySelected: (state, action) => {
      state.daySelected = action.payload.format();
    },
    setShowEventModal: (state, action) => {
      state.showEventModal = action.payload;
    },

  },
});

export const calendarAction = calendarSlice.actions;

export const calendarReducer = calendarSlice.reducer;
