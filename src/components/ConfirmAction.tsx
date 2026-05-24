import {
  Modal,
  ModalBodyContainer,
  ModalButtonContainer,
} from '../components/index.tsx'

const ConfirmAction = ({
  title,
  confirmTitle,
  confirmAction,
  onCancel,
}: {
  confirmTitle: string
  confirmAction: React.MouseEventHandler<HTMLButtonElement>
  title: string
  onCancel:
    | React.MouseEventHandler<HTMLButtonElement>
    | React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <Modal
      visible={true}
      onClose={onCancel as React.MouseEventHandler<HTMLDivElement>}
      title={title}
    >
      <ModalBodyContainer>{confirmTitle}</ModalBodyContainer>
      <ModalButtonContainer>
        <button
          type="button"
          onClick={onCancel as React.MouseEventHandler<HTMLButtonElement>}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 bg-transparent ring-1 ring-white/10 text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={confirmAction}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 bg-red-600/10 text-red-400 ring-1 ring-red-500/20 hover:bg-red-600/20 hover:text-red-300"
        >
          Confirm
        </button>
      </ModalButtonContainer>
    </Modal>
  )
}

export default ConfirmAction
