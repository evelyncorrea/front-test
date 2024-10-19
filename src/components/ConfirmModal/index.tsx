import { Modal, ModalTitle, ModalActions, ModalContainer, ModalButton } from "./styles"

type ConfirmModalProps = {
    confirmText: string
    confirmAction: Function
    closeModal: Function
}

export const ConfirmModal = (props: ConfirmModalProps) => {
    return (
        <ModalContainer>
            <Modal>
                <ModalTitle>{props.confirmText}</ModalTitle>
                <ModalActions>
                    <ModalButton type="exit" onClick={() => props.closeModal()}>Não</ModalButton>
                    <ModalButton type="confirm" onClick={() => props.confirmAction()}>Sim</ModalButton>
                </ModalActions>
            </Modal>
        </ModalContainer>
    )
}