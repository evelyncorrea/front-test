import { Register, Status } from "~/types/Registers";

const baseURL = 'http://localhost:3000/registrations';

export const getRegisters = async () => {
    return await fetch(baseURL);
}

export const getRegistersByCpf = async(cpf: string) => {
    return await fetch(`${baseURL}?cpf=${cpf}`);
}

export const updateRegisterStatus = async(newStatus: Status, register: Register) => {
    return await fetch(`${baseURL}/${register.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ...register,
            status: newStatus
        })
    });
}

export const createNewRegister = async(newRegister: Register) => {
    return await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(newRegister)
    });
}

export const deleteRegister = async(registerId: string) => {
    return await fetch(`${baseURL}/${registerId}`, { method: 'DELETE' });
}