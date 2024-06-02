import * as Dialog from "@radix-ui/react-dialog"
import Spinner from "../ui/spinner"
import { DialogOverlay } from "../ui/dialog"

type LoadingProps = {
  loading?: boolean
  title?: string
}

export default function Loading({ title = "加载中...", loading }: LoadingProps) {
  return (
    <Dialog.Root open={loading}>
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content className="fixed flex flex-col items-center left-[50%] top-[50%] z-50 w-full max-w-xs translate-x-[-50%] translate-y-[-50%] gap-8 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <Spinner size="xl" />
          <p className="text-neutral-500">{title}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
