import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal"
import { Spinner } from "@nextui-org/spinner"

export interface LoadingModalProps {
  loading?: boolean
  title?: string
}

export default function LoadingModal({ title = "loading", loading }: LoadingModalProps) {
  return (
    <Modal hideCloseButton size="xs" isOpen={loading}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Spinner />
        </ModalBody>
        <ModalFooter className="justify-center text-sm text-gray-500">请稍等...</ModalFooter>
      </ModalContent>
    </Modal>
  )
}
