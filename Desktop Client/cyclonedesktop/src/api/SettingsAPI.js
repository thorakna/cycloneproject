import { server_adress } from "./Config";

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
    console.log(content);
    return content;
}

export async function changeCredentials(username, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword, token) {
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
    console.log(content);
    return content;
}