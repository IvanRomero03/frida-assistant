import { api } from "rbrgs/utils/api";
import DocCard from "./docCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const DocGrid = ({ input }: { input: string }) => {
  const { data } = useSession();
  const [ids, setIds] = useState<string[]>([]);
  const { data: docs } = api.docs.getAll.useQuery({
    id: data?.user.id || "",
    ids: ids,
  });

  useEffect(() => {
    const getIds = async () => {
      const res = await axios.post("http://localhost:5000/api/get_search", {
        query: String(input),
      });
      setIds(res.data.ids);
    };
    getIds();
  }, [input]);

  return (
    <div className=" mt-8 grid w-auto grid-cols-2 gap-5 overflow-y-scroll md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {docs?.map((doc, key) => (
        <DocCard key={key} id={doc.id} summary={doc.text} title={doc.name} />
      ))}
    </div>
  );
};

export default DocGrid;
