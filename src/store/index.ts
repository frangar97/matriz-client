import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImpacto } from "../types/IImpacto";
import { IProbabilidad } from "../types/IProbabilidad";
import { IRespuesta } from "../types/IRespuesta";

interface appState {
    respuestas: IRespuesta[]
    impactos: IImpacto[]
    probabilidades: IProbabilidad[]
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
        saveRespuestas: (state, action: PayloadAction<IRespuesta[]>) => {
            state.respuestas = action.payload;
        },
        saveImpactos: (state, action: PayloadAction<IImpacto[]>) => {
            state.impactos = action.payload;
        },
        saveProbabilidades: (state, action: PayloadAction<IProbabilidad[]>) => {
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
export const respuestasSelector = (e: RootState) => e.global.respuestas;
export const impactosSelector = (e: RootState) => e.global.impactos;
export const probabilidadesSelector = (e: RootState) => e.global.probabilidades;

export const { saveImpactos, saveRespuestas, saveProbabilidades } = state.actions;
export default store;