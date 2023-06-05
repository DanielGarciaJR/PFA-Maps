/*Container tileset component to show information*/
const TilesetContainer = ({tile}) => {

    //Indexes to filter Water main content.
    const materialIndex_wm = tile.properties.findIndex(property => property[0] === 'MATERIALD');
    const diameterIndex_wm = tile.properties.findIndex(property => property[0] === 'INSD_DIAM_');

    //Indexes to filter Water main content.
    const materialIndex_sm = tile.properties.findIndex(property => property[0] === 'MATL_DESC');
    const diameterIndex_sm = tile.properties.findIndex(property => property[0] === 'SIZE_NUM');
    
    //Indexes to filter Drain conveyance content.
    const materialIndex_dc = tile.properties.findIndex(property => property[0] === 'MATERIAL');
    const diameterIndex_dc = tile.properties.findIndex(property => property[0] === 'DIAMETER');
    

    
    
    return(
            <div className="m-5 mb-1 p-5 rounded-lg border-gray-300 border hover:bg-purple-200/50">

                {/*content for water main*/} 
                {tile.name == "Water Main" && (
                    <>
                        <p className="mb-2 text-[18px]">
                            {tile.name}
                        </p>

                        <div>
                            <p className="text-[13px] text-gray-500 mb-2">MATERIAL : <a className="text-blue-900 ml-1">{tile.properties[materialIndex_wm][1]}</a></p>
                            <p className="text-[13px] text-gray-500 mb-2">DIAMETER : <a className="text-blue-900 ml-1">{tile.properties[diameterIndex_wm][1]}</a></p>
                        </div>
                    </>
                )}
                
                {/*content for Sewer Main*/}
                {tile.name == "Sewer Main" && (
                    <>
                        <p className="mb-2 text-[18px]">
                            {tile.name}
                        </p>

                        <div>
                            <p className="text-[13px] text-gray-500 mb-2">MATERIAL : <a className="text-blue-900 ml-1">{tile.properties[materialIndex_sm][1]}</a></p>
                            <p className="text-[13px] text-gray-500 mb-2">DIAMETER  : <a className="text-blue-900 ml-1">{tile.properties[diameterIndex_sm][1]}</a></p>
                        </div>
                    </>
                )}

                {/*content for Drain Conveyance*/}
                {tile.name == "Drain Conveyance" && (
                    <>
                        <p className="mb-2 text-[18px]">
                            {tile.name}
                        </p>

                        <div>
                            <p className="text-[13px] text-gray-500 mb-2">MATERIAL : <a className="text-blue-900 ml-1">{tile.properties[materialIndex_dc][1]}</a></p>
                            <p className="text-[13px] text-gray-500 mb-2">DIAMETER  : <a className="text-blue-900 ml-1">{tile.properties[diameterIndex_dc][1]}</a></p>
                        </div>
                    </>
                )}
        
                {/*content for fill tilesets*/}
                {tile.name != 'Water Main' && tile.name != 'Sewer Main' && tile.name != 'Drain Conveyance' && (
                    <>
                        <p className="mb-2 text-[18px]">
                            {tile.name}
                        </p>
            
                        <div>
                            <p className="text-[13px] text-gray-500 mb-2">
                                ID : <a className="text-blue-900 ml-1">{tile.id}</a>
                            </p>

                        {tile.properties.map((el,index) => (
                            <p key={index} className="text-[13px] text-gray-500 mb-2">{el[0]}  : 
                                <a className="text-blue-900 ml-1">{el[1]}</a>
                            </p>
                            ))}
                        </div>
                    </>
                )}
            </div>
    );
}

export default TilesetContainer;