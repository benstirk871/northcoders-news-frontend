function Error({errorCode}){

    if (errorCode === 400){
        return (
            <h2>Topic not found</h2>
        )
    }

    if (errorCode === 404){
        return (
            <h2>Article does not exist</h2>
        )
    }
}

export default Error