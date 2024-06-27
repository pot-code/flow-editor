type NameInputProps = React.ComponentPropsWithRef<"input">

const NameInput = memo<NameInputProps>((props) => {
  const inputRef = useRef<HTMLInputElement>(null!)
  const placeholderRef = useRef<HTMLSpanElement>(null!)

  useEffect(() => {
    placeholderRef.current.textContent = props.value as string
  }, [props.value])

  return (
    <div className="relative min-w-12 h-4">
      <span ref={placeholderRef} className="invisible" />
      <input
        ref={inputRef}
        className="absolute left-0 w-full outline-none text-neutral-500 focus:text-neutral-900"
        {...props}
      />
    </div>
  )
})

export default NameInput
