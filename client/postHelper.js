const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json()

    if(result.error)
    {
        console.log(result.error)
        //handleError(result.error)
    }

    if(result.redirect) {
        window.location = result.redirect
    }

    if(handler)
    {
        handler(result)
    }
}

module.exports = {
    sendPost,
}