import { cpf } from "cpf-cnpj-validator";

export const nameValidation = (data: string) => {
    const isLargerThanTwo = data.length > 2;
    const numberIsNotFirstChar = !Number(data.charAt(0));
    const containsSpace = data.includes(' ');

    return isLargerThanTwo
        && numberIsNotFirstChar
        && containsSpace;
}

export const emailValidation = (data: string) => {
    const atPosition: number = data.indexOf('@');

    const containsAt: boolean = atPosition !== -1;

    let hasDotAfterAt: boolean = false;
    if(containsAt) {
        hasDotAfterAt = data.slice(atPosition).indexOf('.') !== -1;
    }

    return containsAt && hasDotAfterAt;
}

export const cpfValidation = (data: string) => {
    return cpf.isValid(data);
}

export const validations: { [key: string]: Function } = {
    employeeName: nameValidation,
    email: emailValidation,
    cpf: cpfValidation
  };