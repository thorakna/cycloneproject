import { server_adress } from "./Config";
import { RefreshToken } from "./TokenOperations";

export async function getCredentials(username, token) {
    const rawResponse = await fetch(server_adress+"api/users/get-credentials", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token' : token
        },
        body: JSON.stringify({username})
    });
    const content = await rawResponse.json();
    if(content.status === "expired"){
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await getCredentials(username, accessToken) : {status:"fail", message: "The token couldn't be refreshed."};
    }else{
        return content;
    }
}

export async function changeCredentials(username, token, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword) {
    const rawResponse = await fetch(server_adress+"api/users/change-credentials", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token' : token
        },
        body: JSON.stringify({username, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword})
    });
    const content = await rawResponse.json();
    if(content.status === "expired"){
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await changeCredentials(username, accessToken, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword) : {status:"fail", message: "The token couldn't be refreshed."};
    }else{
        return content;
    }
}