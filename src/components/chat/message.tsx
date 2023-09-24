import clsx from 'clsx';

interface MessageProps {
    message: string;
    date: string;
    sentByGTP: boolean;
}

const Message: React.FC<MessageProps> = ({ message, sentByGTP }) => {

    return (
        <div className={clsx(
            sentByGTP ? 'bg-blue-400 ml-40 text-white rounded-lg p-2 m-2' : 'mr-40 bg-gray-200 text-gray-900 rounded-lg p-2 m-2',
            'my-5'

        )}>
            {message}
        </div>
    );
}

export default Message;