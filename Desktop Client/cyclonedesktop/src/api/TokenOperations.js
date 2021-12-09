import { server_adress } from "./Config";

export async function setTokens(access, refresh){
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
}

export async function RefreshToken(){
    var refreshToken = localStorage.getItem("refreshToken");
    const rawResponse = await fetch(server_adress+"api/users/refresh-token", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: refreshToken})
    });
    const content = await rawResponse.json();
    console.log(content);
    if(rawResponse.status === 200){
        setTokens(content.accessToken, content.refreshToken);
        return true;
    }else{
        return false;
    }
}