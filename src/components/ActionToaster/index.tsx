import useRegisters from "~/contexts/Registers"
import { CloseButton, ToasterWrapper, ToasterContent } from "./styles"
import { useEffect } from "react";

export const ActionToaster = () => {
    const { showToaster, toasterValue, changeToasterVisibility } = useRegisters();

    const closeToaster = () => {
        changeToasterVisibility(false);
    }
    
    useEffect(() => {
        if(showToaster) {
            setTimeout(() => {
                closeToaster();
            }, 2000);
        }
    }, [showToaster]);

    return (<>{showToaster &&
        <ToasterWrapper>
            <CloseButton onClick={closeToaster}>×</CloseButton>
            <ToasterContent>{toasterValue}</ToasterContent>
        </ToasterWrapper>
    }</>)
}