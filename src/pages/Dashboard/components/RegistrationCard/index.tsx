import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Status } from "~/types/Registers";
import { useState } from "react";
import { ConfirmModal } from "~/components/ConfirmModal";

type Props = {
  data: {
    admissionDate: string
    cpf: string
    email: string
    employeeName: string
    id: string
    status: Status
  }
  changeStatus: Function
};

const RegistrationCard = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<Status>();

  const isRegisterReproved = props.data.status === Status.REPROVED;
  const isRegisterAproved = props.data.status === Status.APROVED;
  const isRegisterReview = props.data.status === Status.REVIEW;

  const changeCandidateStatus = (newStatus: Status) => {
    setShowModal(true);
    setNewStatus(newStatus);
  }

  return (
    <>
    {showModal && 
      <ConfirmModal 
        confirmText={`Mover candidato para ${newStatus}?`}
        confirmAction={() => props.changeStatus(newStatus, props.data)}
        closeModal={() => setShowModal(false)}
      />
    }
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{props.data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{props.data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{props.data.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          {isRegisterReview && 
          <>
            <ButtonSmall 
              bgcolor="rgb(255, 145, 154)" 
              onClick={() => changeCandidateStatus(Status.REPROVED)}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => changeCandidateStatus(Status.APROVED)}  
            >
              Aprovar
            </ButtonSmall>
          </>}
          {(isRegisterAproved || isRegisterReproved) && 
            <ButtonSmall bgcolor="#ff8858"
              onClick={() => changeCandidateStatus(Status.REVIEW)}
            >
              Revisar novamente
            </ButtonSmall>
          }
          <HiOutlineTrash />
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
