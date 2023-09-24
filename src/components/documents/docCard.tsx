import Link from "next/link";
import { api } from "rbrgs/utils/api";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";

const DocCard = ({ title, summary, id }: { title: string; summary: string, id: string }) => {

    const [audioUrl, setAudioUrl] = useState();
    const { data } = api.textToSpeech.talk.useQuery({ text: summary })

    const playAudio = () => {
        const audioBlob = base64ToBlob(data);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        audioElement.play();
    };

    // Function to convert base64 to Blob
    const base64ToBlob = (data: any) => {
        const byteCharacters = atob(data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'audio/mpeg' }); // Adjust the type as per your audio format
    };


    const handleClick = () => {
        playAudio();

    }

    if (title.length > 15) {
        title = title.slice(0, 15) + "...";
    }

    if (summary.length > 90) {
        summary = summary.slice(0, 90) + "...";
    }

    return (
        <>
            <div className="bg-white p-5 shadow-lg rounded-md">
                <Link
                    href={`/docs/${id}`}
                    className="h-48 w-48 grid-rows-5 rounded-md "
                >
                    <h3 className="font-bold">{title}</h3>
                    <p className="row-span-4">{summary}</p>
                </Link>
                <button onClick={handleClick} className="bg-gray-100 p-1 mt-2 flex">
                    <BsPlayFill className="self-center"/>
                    <div className="self-center">
                        Sound
                    </div>
                </button >
                <div className="invisible">
                    <audio controls>
                        <source src={audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>

            </div >
        </>
    );
};

export default DocCard;