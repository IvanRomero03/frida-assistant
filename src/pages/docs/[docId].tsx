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

export default function Doc() {
  const router = useRouter();
  const { docId } = router.query as { docId: string };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const doc = api.docs.getOne.useQuery({ id: docId });
  // const docData = doc.data;
  const docData = {
    name: "Test",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    webLink: "https://www.google.com",
    fileLink: undefined,
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
      <div className="flex flex-col items-center bg-gray-100">
        <h1 className="my-8 text-3xl font-bold">Doc {docData?.name}</h1>
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
      </div>
    </>
  );
}
