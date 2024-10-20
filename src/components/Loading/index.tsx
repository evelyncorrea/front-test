import useRegisters from "~/contexts/Registers"
import { LoadingWrapper } from "./styles";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Loading = () => {
    const { isLoading } = useRegisters();

    return (<>{isLoading &&
        <LoadingWrapper>
            <AiOutlineLoading3Quarters color="white" size="50px" />
        </LoadingWrapper>
    }</>)
}