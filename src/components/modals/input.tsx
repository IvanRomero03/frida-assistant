'use client'
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    textArea?: boolean;
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({ id, label, placeholder, type, required, register, textArea, errors }) => {
    return (
        <>
            <label className="font-semibold mt-6 mr-3">
                {label}
            </label>

            {textArea ? (
                <textarea id={id} {...register(id, { required })} className="bg-white ring-1 w-5/6 pr-10 w-full outline-blue-400 rounded-lg bg-quaternary p-1 focus:outline-none  h-36 align-text-top" />
            ) : (
                <input id={id} {...register(id, { required })} className="bg-white ring-1 w-5/6 pr-10 outline-blue-400 inset-1 rounded-lg bg-quaternary p-1 focus:outline-none " />
            )}
        </>
    )
}
export default Input;