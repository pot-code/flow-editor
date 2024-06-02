export interface NameInputProps {
  value: string
  onChange?: (value: string) => void
}

const NameInput = memo<NameInputProps>(({ value, onChange }) => {
  const domRef = useRef<HTMLDivElement>(null!)

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
  }, [])

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      onChange?.(e.currentTarget.textContent as string)
    },
    [onChange],
  )

  useEffect(() => {
    domRef.current.textContent = value
  }, [value])

  // why nest div in div?
  // https://stackoverflow.com/questions/34354085/clicking-outside-a-contenteditable-div-stills-give-focus-to-it
  return (
    <div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="outline-none whitespace-pre text-foreground-500 focus:text-foreground"
        ref={domRef}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      >
        {value}
      </div>
    </div>
  )
})

export default NameInput
