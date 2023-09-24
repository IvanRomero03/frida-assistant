import { useRouter } from "next/router";
import { api } from "rbrgs/utils/api";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

interface DocProps {
  docId: string;
  text: string;
  webLink?: string;
  fileLink?: string;
}
export default function Doc() {
  const router = useRouter();
  const { docId } = router.query as { docId: string };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const doc = api.docs.getOne.useQuery({ id: docId });

  const [audioUrl, setAudioUrl] = useState();
  const { data } = api.textToSpeech.talk.useQuery({ text: doc.data?.text || "No info found" })

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



  // const docData = doc.data;
  const docData = {
    name: doc.data?.name,
    text: doc.data?.text || "No information was found",
    webLink: doc.data?.webLink,
    fileLink: doc.data?.fileLink,
  };

  const [hoveredParagraph, setHoveredParagraph] = useState<number | undefined>(
    undefined,
  );
  // const [wordCount, setWordCount] = useState<Record<string, number>>({});
  const wordCount: Record<string, number> = {};
  let mostUsedWords: string[] = [];

  const paragraphs = docData?.text.split("\n");

  // const callSummarizer = async (paragraph: string) => {
  //   // await new Promise((resolve) => setTimeout(resolve, 1));
  //   return paragraph;
  // };

  const summaries = paragraphs?.map((paragraph) => {
    // call to api to summarize paragraph
    paragraph.split(" ").forEach((word) => {
      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    });

    return paragraph.substring(0, paragraph.length / 2);
  });

  mostUsedWords = Object.keys(wordCount)
    .sort((a, b) => {
      if (wordCount[a] === undefined || wordCount[b] === undefined) {
        return 0;
      }

      return wordCount[b]! - wordCount[a]!;
    })
    .slice(0, 10);

  return (
    <>
      <Link
        href={`/dashboard/`}
        className="fixed top-4 left-4 h-8 w-auto px-4 p-1 hover:text-gray-400 ring-1 ring-gray-800"
      >
        <h3 className="font-bold">Back</h3>
      </Link>
      <div className="flex flex-col items-center h-screen bg-gray-100">
        <h1 className="my-8 text-3xl font-bold"> {docData?.name}</h1>
        <div className="flex w-full flex-row justify-start">
          <div className="flex max-w-4xl flex-col justify-evenly">
            {paragraphs?.map((paragraph, index) => (
              <div
                key={index}
                className="relative flex flex-row items-center justify-evenly"
              >
                <p
                  className="mb-4 w-2/4 rounded-sm bg-white p-5 text-xl"
                  onMouseEnter={() => setHoveredParagraph(index)}
                  onMouseLeave={() => setHoveredParagraph(undefined)}
                >
                  {paragraph}
                </p>
                <p
                  className={
                    "absolute -right-24 h-fit w-1/3 rounded-lg bg-white p-5 text-xl" +
                    (hoveredParagraph !== index
                      ? " invisible"
                      : "transition duration-150 ease-out")
                  }
                >
                  {summaries[index]}
                </p>
              </div>
            ))}
          </div>
          <div className="min-w-[30%]">
            <Bar
              data={{
                labels: mostUsedWords,
                datasets: [
                  {
                    label: "Word Count",
                    data: mostUsedWords.map((word) => wordCount[word]),
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
        {docData?.fileLink && (
          <a
            href={docData?.fileLink}
            target="_blank"
            className="text-xl underline"
          >
            Download file
          </a>
        )}
        {docData?.webLink && (
          <a
            href={docData?.webLink}
            target="_blank"
            className="text-xl underline"
          >
            Go to website
          </a>
        )}
        <button className="bg-gray-200 py-1 px-3 rounded-md mt-3" onClick={playAudio}>Play Audio</button>
      </div>
    </>
  );
}
