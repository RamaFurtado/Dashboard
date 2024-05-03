
import { configureStore } from "@reduxjs/toolkit";
import SectionReducer from "./slices/SectionReducer";

export const store = configureStore({
  reducer: {
    sectionReducer: SectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
