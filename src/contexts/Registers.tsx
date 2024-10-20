import { createContext, useContext, useReducer } from "react";
import { ActionTypes, InitialState, ProviderProps } from "./types";
import { AllRegisters, Register, Status } from "~/types/Registers";
import { createNewRegister, getRegisters, getRegistersByCpf, updateRegisterStatus, deleteRegister } from "~/services";

const initialAllRegistersData: AllRegisters = {
    [Status.APROVED]: [],
    [Status.REPROVED]: [],
    [Status.REVIEW]: []
};

const initialData: InitialState = {
    data: initialAllRegistersData,
    isLoading: false,
    showToaster: false,
    toasterValue: "",
    updateData: () => {},
    updateStatus: () => {},
    searchDataByCpf: () => {},
    changeToasterVisibility: () => {},
    postNewRegister: () => {},
    eraseRegister: () => {}
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

    if(type === ActionTypes.CHANGE_TOASTER_VISIBILITY) {
        return {
            ...state,
            showToaster: payload.visibility,
            toasterValue: payload.message
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

                setTimeout(() => {
                    dispatch({ type: ActionTypes.CHANGE_DATA, payload: { data: newData } });
                }, 500);
            });
    }

    const searchDataByCpf = async (cpf: string) => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });

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

                setTimeout(() => {
                    dispatch({ type: ActionTypes.CHANGE_DATA, payload: { data: newData }});
                }, 500);
            })
    }

    const updateStatus = async (newStatus: Status, register: Register) => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });

        updateRegisterStatus(newStatus, register).then(() => {
            updateData();
            setTimeout(() => {
                changeToasterVisibility(true, `Usuário movido para ${newStatus} com sucesso`);
            }, 500)
        }).catch(error => {
            changeToasterVisibility(true, `Ocorreu um erro! Tente novamente`);
            console.error('Erro ao mover usuário: ', error);
        })
    }

    const changeToasterVisibility = (newValue: boolean, message?: string) => {
        dispatch({ type: ActionTypes.CHANGE_TOASTER_VISIBILITY, payload: {visibility: newValue, message } });
    }

    const postNewRegister = async (newRegister: Register) => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });

        createNewRegister(newRegister).then(() => {
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });

            setTimeout(() => {
                dispatch({ 
                    type: ActionTypes.CHANGE_TOASTER_VISIBILITY, 
                    payload: { visibility: true, message: 'Registro criado com sucesso!'}
                });
            }, 500);
        })
    }

    const eraseRegister = async (registerId: string) => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });

        deleteRegister(registerId).then(() => {
            updateData();
            setTimeout(() => {
                dispatch({ 
                    type: ActionTypes.CHANGE_TOASTER_VISIBILITY, 
                    payload: { visibility: true, message: 'Registro deletado com sucesso!'}
                });
            }, 500);
        })
    }

    const value = {
        ...state,
        updateData,
        searchDataByCpf,
        updateStatus,
        changeToasterVisibility,
        postNewRegister,
        eraseRegister
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