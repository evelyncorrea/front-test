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

type ChangeModalDataProps = {
  newStatus?: Status,
  modalText?: string 
}

type ChangeRegisterStatusProps = { 
  newStatus: Status, register: Register 
}

const RegistrationCard = (props: Props) => {
  const { updateStatus, eraseRegister } = useRegisters();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmTextModal, setConfirmTextModal] = useState<string>('');
  const [modalConfirmFunction, setModalConfirmFunction] = useState<'changeStatus' | 'delete'>('changeStatus');
  const [newStatus, setNewStatus] = useState<Status>(Status.REVIEW);

  const isRegisterReproved = props.data.status === Status.REPROVED;
  const isRegisterAproved = props.data.status === Status.APROVED;
  const isRegisterReview = props.data.status === Status.REVIEW;

  const changeStatusModal = ({ newStatus, modalText }: ChangeModalDataProps) => {
    if(newStatus) setNewStatus(newStatus);
    setConfirmTextModal(modalText || `Mover candidato para ${newStatus}?`);

    setModalConfirmFunction(newStatus ? 'changeStatus' : 'delete');
    setShowModal(true);
  }

  const changeRegisterStatus = async({ newStatus, register }: ChangeRegisterStatusProps) => {
    try {
      setShowModal(false);
      await updateStatus(newStatus, register);
    } catch(error) {
      console.error('There was an error updating Register\'s status: ', error);
    }
  }

  const deleteRegister = async() => {
    try {
      setShowModal(false);
      await eraseRegister(props.data.id);
    } catch(error) {
      console.error('There was an error updating Register\'s status: ', error);
    }
  }

  const confirmAction = () => {
    if(modalConfirmFunction === 'changeStatus') {
      changeRegisterStatus({ newStatus, register: props.data })
    } else {
      deleteRegister();
    }
  }

  return (
    <>
    {showModal && 
      <ConfirmModal 
        confirmText={confirmTextModal}
        confirmAction={confirmAction}
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
              onClick={() => changeStatusModal({ newStatus: Status.REPROVED })}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => changeStatusModal({ newStatus: Status.APROVED})}  
            >
              Aprovar
            </ButtonSmall>
          </>}
          {(isRegisterAproved || isRegisterReproved) && 
            <ButtonSmall bgcolor="#ff8858"
              onClick={() => changeStatusModal({ newStatus: Status.REVIEW})}
            >
              Revisar novamente
            </ButtonSmall>
          }
          <HiOutlineTrash onClick={() => changeStatusModal({ modalText: `Deseja deletar o registro ${props.data.employeeName}?`})} />
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
