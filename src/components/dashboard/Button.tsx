interface buttonProps {
    label: string;
    icon: any;
}

const Button:React.FC<buttonProps> = ({label, icon:Icon}) => {
    return (
        <div className='flex bg-white px-6 py-3 w-48'>
                <Icon className="bg-blue-400"/>
               {label}
        </div>
    )
}

export default Button