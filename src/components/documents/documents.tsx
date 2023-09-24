import DocGrid from "./docGrid"
import SearchBar from "../searchBar"
import UploadButton from "./uploadButton"
import { api } from "rbrgs/utils/api";
import { useEffect, useState } from "react";

const Documents = () => {
    
    return (
        <div>
            

            <div className="w-full flex justify-between pr-10">
                <div className="">
                    <div className="font-bold text-gray-900">
                        Documents
                    </div>
                    <div className="text-gray-500">
                        Search for any document using key words or topics.
                    </div>
                </div>

                <UploadButton modal />
            </div>

            <SearchBar search />
            <DocGrid />


        </div>
    )
}

export default Documents