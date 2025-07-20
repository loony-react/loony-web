/* eslint-disable @typescript-eslint/no-explicit-any */
export const Input = ({ value, onChange, type, placeholder }: any) => {
  return (
    <input
      type={type}
      className="w-full px-4 py-2 
      border border-gray-300 dark:border-[#4d4d4d] 
      rounded-md 
      bg-gray-50 dark:bg-[#272727] 
      text-gray-900 dark:text-white 
      focus:outline-none focus:ring-1 focus:ring-[#4d4d4d]"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

// focus:outline-none focus:ring-1 focus:ring-[#4d4d4d]
