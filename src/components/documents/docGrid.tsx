import { api } from "rbrgs/utils/api";
import DocCard from "./docCard"
import { useSession } from "next-auth/react";


const DocGrid = () => {
    const {data} = useSession();

    const { data: docs } = api.docs.getAll.useQuery({
        id: data?.user.id || ""
    });

    return (
        <div className=" grid gap-5 mt-8 w-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-y-scroll">
            {docs?.map((doc, key) => (
                <DocCard key={key}  id={doc.id} summary={doc.text} title={doc.name}/>
            ))}
        </div>
    )
}

export default DocGrid