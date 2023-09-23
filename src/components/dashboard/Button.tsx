import clsx from "clsx";

interface buttonProps {
    label: string;
    icon: any;
    selected: boolean;
    onClick: () => void;
}

const Button: React.FC<buttonProps> = ({ label, icon: Icon, selected, onClick }) => {
    return (
        <div className={clsx(selected ? 'bg-gray-100' : 'bg-white text-gray-500', 'flex px-6 py-3 w-48 rounded-md justify-center')} onClick={onClick}>
            <Icon className="text-blue-400 font-bold self-center mr-2" onClick={onClick} />
            {label}
        </div>
    )
}

export default Button