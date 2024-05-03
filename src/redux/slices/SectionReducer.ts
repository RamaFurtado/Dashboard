import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    sectionActual: string;
}

const initialState: IInitialState = {
    sectionActual: "inicio",
}

export const SectionReducer = createSlice({
    name: "SectionReducer",
    initialState,
    reducers: {
        setSectionActual(state, action: PayloadAction<string>) {
            state.sectionActual = action.payload
        }
    }
})

export const { setSectionActual } = SectionReducer.actions
export default SectionReducer.reducer