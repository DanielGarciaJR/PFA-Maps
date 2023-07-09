import { useDeleteAdu } from "@/hooks/useDeleteAdu";
import Image from "next/image";


const AduContainer = ({adu,modal}) => {

    const { deleteAdu } = useDeleteAdu(adu.id,modal);

    return(
       <>
            <a className="flex flex-col items-center ml-8 mb-5 bg-white border border-gray-200 rounded-lg shadow md:flex-row w-[90%]   dark:hover:bg-purple-50">
                <Image
                    className="rounded-tl-lg rounded-bl-lg  h-[200px]"
                    src='/images/adu.jpeg'
                    width='250'
                    height='250'
                    priority
                    alt="adu">
                </Image>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-purple-400 ">
                        {adu.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {adu.fts} feet & {adu.height} height.
                    </p>
                    <p className=" font-normal text-[11px] text-gray-700 dark:text-gray-400">
                        Created at : { new Date(adu.created_at).toLocaleString()}
                    </p>
                    <p className="mb-3 font-normal text-[11px] text-gray-700 dark:text-gray-400">
                        Last updated : { new Date(adu.updated_at).toLocaleString()}
                    </p>
                    <button onClick={deleteAdu} type="button" className="focus:outline-none w-[55%] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  py-2 mr-2 mb-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                    </button>
                </div>
            </a>
        </>
    );
}

export default AduContainer;

