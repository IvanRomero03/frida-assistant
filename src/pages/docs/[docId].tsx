import { useRouter } from "next/router";
import { api } from "rbrgs/utils/api";

export default function Doc () {
    const router = useRouter()
    const { docId } = router.query as { docId: string }

    const doc = api.docs.getOne.useQuery({id: docId})
    const docData = doc.data

    return (
        <>
            <div className="bg-gray-100 h-screen flex flex-col">
                <h1 className="text-3xl font-bold">Doc {docData?.name}</h1>
                <p className="text-xl">{docData?.text}</p>
                {docData?.fileLink && (
                    <a href={docData?.fileLink} target="_blank" className="text-xl underline">Download file</a>
                )}
                {docData?.webLink && (
                    <a href={docData?.webLink} target="_blank" className="text-xl underline">Go to website</a>
                )}
            </div>
        </>
    )
}