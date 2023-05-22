/*Container tileset component to show information*/
const TilesetContainer = ({tile}) => {
    
    return(
        <div className="m-5 mb-1 p-5 rounded-lg border-gray-300 border hover:bg-purple-200/50">
            <p 
                className="mb-2 text-[18px]">
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
        </div>
    );
}

export default TilesetContainer;