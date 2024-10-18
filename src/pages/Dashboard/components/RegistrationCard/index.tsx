import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Status } from "~/types/Registers";

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
  const isRegisterReproved = props.data.status === Status.REPROVED;
  const isRegisterAproved = props.data.status === Status.APROVED;
  const isRegisterReview = props.data.status === Status.REVIEW;

  const changeCandidateStatus = async (newStatus: Status) => {
    props.changeStatus(newStatus, props.data)
  }

  return (
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
        {!isRegisterReproved && <ButtonSmall 
          bgcolor="rgb(255, 145, 154)" 
          onClick={() => changeCandidateStatus(Status.REPROVED)}
        >
          Reprovar
        </ButtonSmall>}
        {!isRegisterAproved && <ButtonSmall
          bgcolor="rgb(155, 229, 155)"
          onClick={() => changeCandidateStatus(Status.APROVED)}  
        >
          Aprovar
        </ButtonSmall>}
        {!isRegisterReview && <ButtonSmall bgcolor="#ff8858"
          onClick={() => changeCandidateStatus(Status.REVIEW)}
        >
          Revisar novamente
        </ButtonSmall>}
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
