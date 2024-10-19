
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Register, Status } from "~/types/Registers";
import useRegisters from "~/contexts/Registers";
import { useEffect } from "react";

const allColumns = [
  { status: Status.REVIEW, title: "Pronto para revisar" },
  { status: Status.APROVED, title: "Aprovado" },
  { status: Status.REPROVED, title: "Reprovado" },
];

const Columns = () => {
  const { isLoading, data: registrations, updateData, updateStatus } = useRegisters();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      updateData();
    }

    return () => {
      ignore = true;
    };
  }, [])

  const changeCandidateStatus = async(newStatus: Status, candidate: Register) => {
    try {
      await updateStatus(newStatus, candidate);
    } catch(error) {
      console.error('There was an error updating candidate\'s status: ', error);
    }
  }

  return (
    <S.Container>
      {isLoading && 'Loading...'}
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
