import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    sucursalActual: string;
}

const initialState: IInitialState = {
    sucursalActual: "sucursal1",
}

export const SucursalReducer = createSlice({
    name: "SucursalReducer",
    initialState,
    reducers: {
        setCurrentSucursal(state, action: PayloadAction<string>) {
            state.sucursalActual = action.payload
        }
    }
})

export const { setCurrentSucursal } = SucursalReducer.actions
export default SucursalReducer.reducer