import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { cpf } from "cpf-cnpj-validator";
import { useState } from "react";
import useRegisters from "~/contexts/Registers";

export const SearchBar = () => {
  const history = useHistory();
  const { updateData, searchDataByCpf } = useRegisters();
  const [hasError, setHasError] = useState(false);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const search = (event: KeyboardEvent) => {
    if(event.key === 'Enter') {
      const targetValue = (event.target as HTMLInputElement).value;

      if(!targetValue) {
        updateData();
        setHasError(false);
        
        return;
      }

      if(cpf.isValid(targetValue)) {
        searchDataByCpf(targetValue);
        setHasError(false);
      } else {
        setHasError(true);
      }
    }
  }
  
  return (
    <S.Container>
      <div>
        <TextField placeholder="Digite um CPF válido" onKeyDown={(event) => search(event)} />
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
