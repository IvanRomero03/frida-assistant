interface buttonProps {
    label: string;
    icon: any;
}

const Button: React.FC<buttonProps> = ({ label, icon: Icon }) => {
    return (
        <div className='flex bg-white px-6 py-3 w-48 rounded-md'>
            <Icon className="text-blue-400 font-bold self-center mr-2" />
            {label}
        </div>
    )
}

export default Button