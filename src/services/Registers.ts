import { Register, Status } from "~/types/Registers";

export const getRegisters = async () => {
    return await fetch('http://localhost:3000/registrations');
}

export const getRegistersByCpf = async(cpf: string) => {
    return await fetch(`http://localhost:3000/registrations?cpf=${cpf}`);
}

export const updateRegisterStatus = async(newStatus: Status, register: Register) => {
    return await fetch(`http://localhost:3000/registrations/${register.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ...register,
            status: newStatus
        })
    })
}