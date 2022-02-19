import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Impacto } from "../types/impacto";
import { Probabilidad } from "../types/probabilidad";
import { Respuesta } from "../types/respuesta";

interface appState {
    respuestas: Respuesta[]
    impactos: Impacto[]
    probabilidades: Probabilidad[]
}

const initialState: appState = {
    respuestas: [],
    impactos: [],
    probabilidades: []
}

const state = createSlice({
    name: "global",
    initialState,
    reducers: {
        saveRespuestas: (state, action: PayloadAction<Respuesta[]>) => {
            state.respuestas = action.payload;
        },
        saveImpactos: (state, action: PayloadAction<Impacto[]>) => {
            state.impactos = action.payload;
        },
        saveProbabilidades: (state, action: PayloadAction<Probabilidad[]>) => {
            state.probabilidades = action.payload;
        }
    }
});


const store = configureStore({
    reducer: {
        global: state.reducer
    }
});

type RootState = ReturnType<typeof store.getState>

export const globalSelector = (e: RootState) => e.global;
export const { saveImpactos, saveRespuestas, saveProbabilidades } = state.actions;
export default store;