import clsx from "clsx";
import { format } from "date-fns";

interface MessageProps {
  message: string;
  date?: Date;
  sentByGTP: boolean;
}

const Message: React.FC<MessageProps> = ({ message, sentByGTP, date }) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          !sentByGTP
            ? "m-2 ml-40 rounded-lg bg-blue-400 p-2 text-white"
            : "m-2 mr-40 rounded-lg bg-gray-200 p-2 text-gray-900",
          "my-6",
        )}
      >
        {message}
      </div>
      <div
        className={clsx(
          "absolute top-10 text-sm text-gray-400",
          sentByGTP ? "left-2" : "right-2",
        )}
      >
        {(date && format(new Date(date), "p")) ?? "12:00"}
      </div>
    </div>
  );
};

export default Message;
