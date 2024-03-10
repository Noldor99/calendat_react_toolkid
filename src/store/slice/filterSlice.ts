import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "./eventSlice";

export interface IFilterLabel {
  label: string;
  checked: boolean;
}

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("events") || "[]");
}

interface IEventState {
  filterEvents: IEvent[];
  filterLabels: IFilterLabel[];
  searchText: string;
}

const initialState: IEventState = {
  filterEvents: [],
  filterLabels: [],
  searchText: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilterLabels(state) {
      const events = getFromLocalStorage();
      state.filterLabels = getUniqueLabels(events, state.filterLabels);
    },
    updateFilterLabelsById(state, { payload }: PayloadAction<string>) {
      const labelToUpdate = state.filterLabels.find((label) => label.label === payload);

      if (labelToUpdate) {
        labelToUpdate.checked = !labelToUpdate.checked;
      }
    },
    updateFilterEvents(state) {
      const events = getFromLocalStorage();
      const filteredEvents = events.filter((event: IEvent) => {
        const label = state.filterLabels.find((filterLabel) => filterLabel.label === event.label);
        return label && label.checked;
      });

      state.filterEvents = filteredEvents.filter((event: IEvent) =>
        event.title.toLowerCase().includes(state.searchText.toLowerCase())
      );
    },
    setSearchText(state, { payload }: PayloadAction<string>) {
      state.searchText = payload;
    },
  },
});

export const filterActions = filterSlice.actions;
export const filterReducer = filterSlice.reducer;



const getUniqueLabels = (events: IEvent[], existingLabels: IFilterLabel[]): IFilterLabel[] => {
  const uniqueLabelsSet = new Set<string>();
  events.forEach((event) => {
    uniqueLabelsSet.add(event.label);
  });

  const uniqueLabels: string[] = Array.from(uniqueLabelsSet);

  const filterLabels: IFilterLabel[] = uniqueLabels.map((label) => {
    const existingLabel = existingLabels.find((el) => el.label === label);
    return {
      label,
      checked: existingLabel ? existingLabel.checked : true,
    };
  });

  return filterLabels;
};