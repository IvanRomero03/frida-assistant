"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  textArea?: boolean;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type,
  required,
  register,
  textArea,
  errors,
}) => {
  return (
    <>
      <label className="mr-3 mt-6 font-semibold">{label}</label>

      {textArea ? (
        register ? (
          <textarea
            id={id}
            {...register(id, { required })}
            className="bg-quaternary m-8 h-36 w-5/6 w-full rounded-lg bg-white p-1 pr-10 align-text-top  outline-blue-400 ring-1 focus:outline-none"
          />
        ) : (
          <textarea
            id={id}
            placeholder={placeholder}
            className="bg-quaternary m-8 h-36 w-5/6 w-full rounded-lg bg-white p-1 pr-10 align-text-top  outline-blue-400 ring-1 focus:outline-none"
          />
        )
      ) : register ? (
        <input
          id={id}
          {...register(id, { required })}
          className="bg-quaternary inset-1 w-5/6 rounded-lg bg-white p-1 pr-10 outline-blue-400 ring-1 focus:outline-none "
        />
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          className="bg-quaternary inset-1 w-5/6 rounded-lg bg-white p-1 pr-10 outline-blue-400 ring-1 focus:outline-none "
        />
      )}
    </>
  );
};
export default Input;
