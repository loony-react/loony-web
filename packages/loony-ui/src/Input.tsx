export const Input = ({
  value,
  onChange,
  type,
  placeholder,
  name,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: {
  name: string
  value: string
  type: string
  placeholder: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  id?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-describedby"?: string
}) => {
  return (
    <input
      id={id}
      type={type}
      className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/50 focus:border-[#10a37f]/60 transition-all duration-150"
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
    />
  )
}

export const PasswordInput = ({
  value,
  onChange,
  type,
  placeholder,
  name,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: {
  name: string
  value: string
  type: string
  placeholder: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  id?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-describedby"?: string
}) => {
  return (
    <input
      id={id}
      type={type}
      className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/50 focus:border-[#10a37f]/60 transition-all duration-150"
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      autoComplete="current-password"
    />
  )
}
