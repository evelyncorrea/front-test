import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { ChangeEvent, useState } from "react";
import useRegisters from "~/contexts/Registers";
import { cpfMask } from "~/utils/masks";
import { cpfValidation } from "~/utils/formValidations";

export const SearchBar = () => {
  const history = useHistory();
  const { updateData, searchDataByCpf } = useRegisters();
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const search = (event: ChangeEvent) => {
    const targetValue = (event.target as HTMLInputElement).value;
    setCurrentValue(cpfMask(targetValue));

    if(!targetValue) {
      updateData();
      setHasError(false);

      return;
    }

    if(cpfValidation(targetValue)) {
      searchDataByCpf(targetValue);
      setHasError(false);
    } else {
      setHasError(true);
    }
  }
  
  return (
    <S.Container>
      <div>
        <TextField 
          value={currentValue} 
          placeholder="Digite um CPF válido"
          maxLength={14}
          onChange={(event) => search(event)}
        />
        {hasError && <S.ErrorText>O CPF é inválido!</S.ErrorText>}
      </div>
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={() => updateData()} />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
