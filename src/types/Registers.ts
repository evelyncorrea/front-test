export enum Status {
    APROVED = "APROVED",
    REVIEW = "REVIEW",
    REPROVED = "REPROVED"
}

export type Register = {
    admissionDate: string,
    email: string,
    employeeName: string,
    status: Status,
    cpf: string,
    id: string
}

export type AllRegisters = {
    [Status.APROVED]: Array<Register>,
    [Status.REPROVED]: Array<Register>,
    [Status.REVIEW]: Array<Register>
}