const TilesetTable = ({tileset}) => {
    
    return(
        <table className='border-2 border-dashed'>
            <thead>
                <tr className='border-2 '>
                    <th className='bg-purple-400 text-white'>
                        {tileset.name}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <a className="text-gray-500">
                            ID
                        </a> : 
                        <a className="text-blue-900 font-medium">
                            {tileset.id}
                        </a>
                    </td>
                </tr>
                
                {tileset.properties.map((el,index) => {
                return (
                    <tr className='border-2 border-dashed' key={index}>
                        <td>
                            <a className='text-gray-500'>
                                {el[0]}
                            </a> : 
                            <a className='text-blue-900 font-medium'>
                                {el[1]}
                            </a>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TilesetTable;