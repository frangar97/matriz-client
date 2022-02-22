import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImpacto } from "../types/IImpacto";
import { IProbabilidad } from "../types/IProbabilidad";
import { IRespuesta } from "../types/IRespuesta";
import { ITipoControl } from "../types/ITipoControl";
import { ITipoEjecucion } from "../types/ITipoEjecucion";

interface appState {
    respuestas: IRespuesta[]
    impactos: IImpacto[]
    probabilidades: IProbabilidad[],
    tiposEjecucion: ITipoEjecucion[],
    tiposControl: ITipoControl[]
}

const initialState: appState = {
    respuestas: [],
    impactos: [],
    probabilidades: [],
    tiposEjecucion: [],
    tiposControl: []
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
        },
        saveTiposEjecucion: (state, action: PayloadAction<ITipoEjecucion[]>) => {
            state.tiposEjecucion = action.payload;
        },
        saveTiposControl: (state, action: PayloadAction<ITipoControl[]>) => {
            state.tiposControl = action.payload;
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
export const tiposEjecucionSelector = (e: RootState) => e.global.tiposEjecucion;
export const tiposControlSelector = (e: RootState) => e.global.tiposControl;

export const { saveImpactos, saveRespuestas, saveProbabilidades, saveTiposEjecucion, saveTiposControl } = state.actions;
export default store;