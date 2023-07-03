const AduRequest = () => {
    return(
        <>jk</>
    )
}

export default AduRequest;




/*export async function getServerSideProps(context){
    try{
        const response = await fetch(`${process.env.BASE_URL_API}/adu`,{
            headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
            mode: 'cors',  
        });
    
        const data = await response.json()

        let paths = data.map((el) => ({
            params: {
                id : `${el.id}`
            }
        }))

        return {paths,fallback:false}

    }catch(error){
        console.log(error)
    }
}

export async function getServerSideProps({params}){
    try{

        const response = await fetch()

    }catch(error){
        console.log(error);
    }
}*/