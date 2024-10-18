
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { useRegisters } from "~/hooks/Registers";
import { Register, Status } from "~/types/Registers";
import { updateRegisterStatus } from "~/services/Registers";

const allColumns = [
  { status: Status.REVIEW, title: "Pronto para revisar" },
  { status: Status.APROVED, title: "Aprovado" },
  { status: Status.REPROVED, title: "Reprovado" },
];

const Columns = () => {
  const { data: registrations, updateColumnsData } = useRegisters();

  const changeCandidateStatus = async(newStatus: Status, candidate: Register) => {
    try {
      await updateRegisterStatus(newStatus, candidate);
      
      await updateColumnsData();
    } catch(error) {
      console.error('There was an error updating candidate\'s status: ', error);
    }
  }

  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations[column.status]?.map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                      changeStatus={changeCandidateStatus}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};

export default Columns;
