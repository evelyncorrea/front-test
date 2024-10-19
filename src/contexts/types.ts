import { ReactNode } from "react"
import { AllRegisters } from "~/types/Registers"

export type ProviderProps = {
    children: ReactNode
}

export type InitialState = {
    data: AllRegisters
    isLoading: boolean
    updateStatus: Function
    updateData: Function
    searchDataByCpf: Function
}

export enum ActionTypes {
    CHANGE_DATA = 'CHANGE_DATA',
    SET_LOADING = 'SET_LOADING'
}