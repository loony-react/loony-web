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
      className="w-full px-4 py-2 border border-gray-300 dark:border-[#4d4d4d] rounded-md bg-gray-50 dark:bg-[#292929] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4d4d4d]"
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
      className="w-full px-4 py-2 border border-gray-300 dark:border-[#4d4d4d] rounded-md bg-gray-50 dark:bg-[#292929] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4d4d4d]"
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

// focus:outline-none focus:ring-1 focus:ring-[#4d4d4d]
