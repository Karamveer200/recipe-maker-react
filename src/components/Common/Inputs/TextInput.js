const TextInput = ({
  label,
  onChange,
  value = '',
  type = 'text',
  placeholder = '',
  name = '',
  disabled = false
}) => {
  return (
    <div>
      {label && (
        <label className="block text-xxs sm:text-sm md:text-base leading-6 pinkWhiteText MontserratFamily font-semibold">
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          disabled={disabled}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
           ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
            text-xxs sm:text-sm md:text-base sm:leading-6 pl-2 sm:pl-4 outline-none MontserratFamily"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextInput;
