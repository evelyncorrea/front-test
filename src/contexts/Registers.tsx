import { createContext, useContext, useReducer } from "react";
import { ActionTypes, InitialState, ProviderProps } from "./types";
import { AllRegisters, Register, Status } from "~/types/Registers";
import { getRegisters, getRegistersByCpf, updateRegisterStatus } from "~/services";

const initialAllRegistersData: AllRegisters = {
    [Status.APROVED]: [],
    [Status.REPROVED]: [],
    [Status.REVIEW]: []
};

const initialData: InitialState = {
    data: initialAllRegistersData,
    isLoading: false,
    updateData: () => {},
    updateStatus: () => {},
    searchDataByCpf: () => {}
}

const RegistersContext = createContext(initialData);

const RegistersReducer = (state: InitialState, action: { type: ActionTypes, payload: any }): InitialState => {
    const { type, payload } = action;

    if(type === ActionTypes.CHANGE_DATA) {
        return {
            ...state,
            data: payload.data,
            isLoading: false
        }
    }

    if(type === ActionTypes.SET_LOADING) {
        return {
            ...state,
            isLoading: payload
        }
    }

    return state;
}

export const RegistersProvider = ({ children }: ProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(RegistersReducer, initialData)

    const updateData = async() => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true })

        getRegisters()
            .then(response => response.json())
            .then(json => {
                let newData = initialAllRegistersData;
                json.map((item: Register) => {
                    const currentStatus = Status[item.status];

                    newData = {
                        ...newData, 
                        [currentStatus]: [...newData[currentStatus], item]
                    };
                });

                dispatch({ type: ActionTypes.CHANGE_DATA, payload: { data: newData } });
            });
    }

    const searchDataByCpf = async (cpf: string) => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true })

        getRegistersByCpf(cpf)
            .then(res => res.json())
            .then(json => {
                let newData = initialAllRegistersData;

                json.map((item: Register) => {
                    const currentStatus = Status[item.status];
        
                    newData = {
                        ...newData, 
                        [currentStatus]: [...newData[currentStatus], item]
                    };
                })

                dispatch({ type: ActionTypes.CHANGE_DATA, payload: { data: newData }})
            })
    }

    const updateStatus = (newStatus: Status, register: Register) => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true })
        
        updateRegisterStatus(newStatus, register).then(() => {
            updateData();
        });
    }

    const value = {
        ...state,
        updateData,
        searchDataByCpf,
        updateStatus,
    }
    
    return <RegistersContext.Provider value={value}>{ children }</RegistersContext.Provider>
}

const useRegisters = () => {
    const context = useContext(RegistersContext);

    if(context === undefined) {
        throw new Error('useRegisters must be used inside RegistersContext');
    }

    return context;
}

export default useRegisters;