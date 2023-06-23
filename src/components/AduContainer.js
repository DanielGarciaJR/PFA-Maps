import Image from "next/image";

const AduContainer = ({adu}) => {

    return(
        <div className=" mt-3 p-4 border-white-500 bg-white  border rounded-lg flex text-[18px]">
                <Image
                    className="rounded-lg"
                    src='/images/adu.jpeg'
                    width='250'
                    height='250'
                    priority
                    alt="adu">
                </Image>

                <div className="p-2 ml-4 mr-4 text-[16px]">
                    <p className="m-1">Name: <a className="text-purple-700">{adu.name}</a></p>
                    <p className="m-1">Fts: <a className="text-purple-700">{adu.fts}</a></p>
                    <p className="m-1 mb-4">Height: <a className="text-purple-700">{adu.height}</a></p>
                    <p className="m-1 text-[12px]">Created at : <a className="text-purple-700">{new Date(adu.created_at).toLocaleString()}</a></p>
                    <p className="m-1 text-[12px]">Updated at : <a className="text-purple-700">{ new Date(adu.updated_at).toLocaleString()}</a></p>
                </div>
        </div>
    );
}

export default AduContainer;

