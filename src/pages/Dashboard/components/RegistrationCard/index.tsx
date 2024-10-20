import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Register, Status } from "~/types/Registers";
import { useState } from "react";
import { ConfirmModal } from "~/components/ConfirmModal";
import useRegisters from "~/contexts/Registers";

type Props = {
  data: {
    admissionDate: string
    cpf: string
    email: string
    employeeName: string
    id: string
    status: Status
  }
};

const RegistrationCard = (props: Props) => {
  const { updateStatus } = useRegisters();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<Status>(Status.REVIEW);

  const isRegisterReproved = props.data.status === Status.REPROVED;
  const isRegisterAproved = props.data.status === Status.APROVED;
  const isRegisterReview = props.data.status === Status.REVIEW;

  const changeStatusModal = (newStatus: Status) => {
    setNewStatus(newStatus);
    setShowModal(true);
  }

  const changeCandidateStatus = async(newStatus: Status, candidate: Register) => {
    try {
      setShowModal(false);
      await updateStatus(newStatus, candidate);
    } catch(error) {
      console.error('There was an error updating candidate\'s status: ', error);
    }
  }

  return (
    <>
    {showModal && 
      <ConfirmModal 
        confirmText={`Mover candidato para ${newStatus}?`}
        confirmAction={() => changeCandidateStatus(newStatus, props.data)}
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
              onClick={() => changeStatusModal(true)}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => changeStatusModal(Status.APROVED)}  
            >
              Aprovar
            </ButtonSmall>
          </>}
          {(isRegisterAproved || isRegisterReproved) && 
            <ButtonSmall bgcolor="#ff8858"
              onClick={() => changeStatusModal(Status.REVIEW)}
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
