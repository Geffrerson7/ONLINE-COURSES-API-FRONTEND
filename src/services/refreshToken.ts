const refreshToken = async (refresh_token:string) => {
    const response = await fetch("http://127.0.0.1:8000/user/refresh-token/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refresh: refresh_token,
        })
    });
    const new_access_token = await response.json();

    return new_access_token
}

export default refreshToken