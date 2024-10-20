import { ReactNode } from "react"
import { AllRegisters } from "~/types/Registers"

export type ProviderProps = {
    children: ReactNode
}

export type InitialState = {
    data: AllRegisters
    isLoading: boolean
    showToaster: boolean
    toasterValue: string
    updateStatus: Function
    updateData: Function
    searchDataByCpf: Function
    changeToasterVisibility: Function
    postNewRegister: Function
    eraseRegister: Function
}

export enum ActionTypes {
    CHANGE_DATA = 'CHANGE_DATA',
    SET_LOADING = 'SET_LOADING',
    CHANGE_TOASTER_VISIBILITY = 'CHANGE_TOASTER_VISIBILITY'
}