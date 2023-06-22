import { useGeoJsonForm } from "@/hooks/useGeojsonForm";
import ErrorMessage from "./ErrorMessage";

const GeojsonForm = () => {

    const {handleChange,handleSubmit, error, fileRef,setError} = useGeoJsonForm();

    return(
        <div className='p-3'>
            <div className='m-1'>
                <h1 className="mb-3">Choose a GeoJson file</h1>
                <form name="geojson" onSubmit={handleSubmit} className='text-[13px] flex flex-col'>
                    <input type="file" accept=".geojson" required onChange={handleChange} onFocus={() => setError(false)} ref={fileRef}/>
                    {error && 
                        <ErrorMessage>
                            <p className="bg-red-100 mt-2 p-2 text-red-600">
                                Error: Only .geojson supported
                            </p>
                        </ErrorMessage>
                    }
                   { /*<button type="submit" className="text-white bg-purple-700 w-20 p-1 rounded-md mt-5">Save</button> */ }
                </form>
            </div>
        </div>
    );
}

export default GeojsonForm;