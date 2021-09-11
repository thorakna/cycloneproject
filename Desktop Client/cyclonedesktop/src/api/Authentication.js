import { server_adress } from "./Config";

export default async function Login(username, pass){
    const rawResponse = await fetch(server_adress+"login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password: pass})
    });
    const content = await rawResponse.json();
    console.log(content);
    return content;
}

export async function Register(email, pass, username){
    const rawResponse = await fetch(server_adress+"register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, mail: email, password: pass})
    });
    const content = await rawResponse.json();
    console.log(content);
    return content;
}