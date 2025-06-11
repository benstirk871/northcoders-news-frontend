function Error({errorCode}){

    if (errorCode === 400){
        return (
            <h2>Topic not found</h2>
        )
    } else if (errorCode === 404){
        return (
            <h2>Article does not exist</h2>
        )
    } else {
        return (
            <h2>Could not load data</h2>
        )
    }
}

export default Error