import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useState } from "react";
import { FormData, FormDataErrors } from "./types";
import { validations } from "~/utils/formValidations";
import { cpfMask } from "~/utils/masks";
import useRegisters from "~/contexts/Registers";
import { Status } from "~/types/Registers";

const NewUserPage = () => {
  const { postNewRegister } = useRegisters();
  const history = useHistory();

  const [formData, setFormData] = useState<FormData>({
    employeeName: '',
    email: '',
    cpf: '',
    admissionDate: ''
  });

  const [isFieldValid, setIsFieldValid] = useState<FormDataErrors>({
    employeeName: false,
    email: false,
    cpf: false
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const changeFormValue = (field: string, newVal: string) => {
    let value = newVal;

    if(field === 'cpf') value = cpfMask(newVal);

    setFormData(curr => ({ ...curr, [field]: value }));
  }

  const changeErrorStatus = (field: string, newVal: boolean) => {
    const newIsFieldValid = { ...isFieldValid, [field]: newVal };
    setIsFieldValid(newIsFieldValid);

    let isNewValuesValid = true;
    Object.values(newIsFieldValid).map(valid => {
      isNewValuesValid = valid;
    });

    setIsFormValid(isNewValuesValid); 
  }

  const changeAndValidateFormDataValues = (field: string, data: EventTarget) => {
    const inputValue = (data as HTMLInputElement).value;

    if(field !== 'admissionDate') {
      const isFieldValid = validations[field](inputValue);
      changeErrorStatus(field, isFieldValid);
    }

    changeFormValue(field, inputValue);
  }

  const submitNewRegister = () => {
    if(isFormValid) {
      postNewRegister({ ...formData, status: Status.REVIEW });
      goToHome();
    }
  }

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <div>
          <TextField
            value={formData.employeeName}
            placeholder="Nome" 
            label="Nome"
            onChange={(event) => changeAndValidateFormDataValues('employeeName', event.target)}
          />
          {!isFieldValid.employeeName && <S.ErrorMessage>Digite o nome completo</S.ErrorMessage>}
        </div>
        <div>
          <TextField
            value={formData.email}
            placeholder="Email" 
            label="Email" 
            type="email"
            onChange={(event) => changeAndValidateFormDataValues('email', event.target)}
          />
          {!isFieldValid.email && <S.ErrorMessage>Digite um email válido</S.ErrorMessage>}
        </div>
        <div>
          <TextField 
            value={formData.cpf}
            placeholder="CPF"
            label="CPF"
            onChange={(event) => changeAndValidateFormDataValues('cpf', event.target)}  
          />
          {!isFieldValid.cpf && <S.ErrorMessage>Digite um CPF válido</S.ErrorMessage>}
        </div>
        <TextField 
          value={formData.admissionDate} 
          label="Data de admissão"
          type="date"
          onChange={(event) => changeAndValidateFormDataValues('admissionDate', event.target)}
        />
        <Button disabled={!isFormValid} onClick={() => submitNewRegister()}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
