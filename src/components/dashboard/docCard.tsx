import Link from "next/link";

const DocCard = ({ title, summary, id }: { title: string; summary: string, id: string }) => {
  if (title.length > 15) {
    title = title.slice(0, 15) + "...";
  }

  if (summary.length > 90) {
    summary = summary.slice(0, 90) + "...";
  }

  return (
    <>
      <Link
        href={`/docs/${id}`}
        className="h-48 w-48 grid-rows-5 rounded-md bg-white p-5 shadow-lg"
      >
        <h3 className="font-bold">{title}</h3>
        <p className="row-span-4">{summary}</p>
      </Link>
    </>
  );
};

export default DocCard;
