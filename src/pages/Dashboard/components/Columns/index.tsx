
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Status } from "~/types/Registers";
import useRegisters from "~/contexts/Registers";
import { useEffect } from "react";

const allColumns = [
  { status: Status.REVIEW, title: "Pronto para revisar" },
  { status: Status.APROVED, title: "Aprovado" },
  { status: Status.REPROVED, title: "Reprovado" },
];

const Columns = () => {
  const { data: registrations, updateData } = useRegisters();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      updateData();
    }

    return () => {
      ignore = true;
    };
  }, [])

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
