import clsx from 'clsx';
import {format} from 'date-fns';

interface MessageProps {
    message: string;
    date: Date;
    sentByGTP: boolean;
}

const Message: React.FC<MessageProps> = ({ message, sentByGTP, date }) => {

    return (
        <div className='relative'>
            <div className={clsx(
                sentByGTP ? 'bg-blue-400 ml-40 text-white rounded-lg p-2 m-2' : 'mr-40 bg-gray-200 text-gray-900 rounded-lg p-2 m-2',
                'my-6'

            )}>
                {message}
            </div>
            <div className={clsx('absolute top-10 text-gray-400 text-sm',
                !sentByGTP ? 'left-2' : 'right-2',
            )}>
                 {date && format(new Date(date), 'p')}
            </div>
        </div>
    );
}

export default Message;