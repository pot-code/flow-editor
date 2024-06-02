import { cn } from "@/utils/shad"
import { cva, type VariantProps } from "class-variance-authority"

const spinnerVariants = cva("animate-spin h-5 w-5 text-neutral-500", {
  variants: {
    size: {
      default: "h-5 w-5",
      sm: "h-4 w-4",
      lg: "h-8 w-8",
      xl: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface Props extends React.ComponentPropsWithoutRef<"svg">, VariantProps<typeof spinnerVariants> {
  className?: string
}

export default function Spinner({ className, size }: Props) {
  return (
    <svg
      className={cn(spinnerVariants({ size }), className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
