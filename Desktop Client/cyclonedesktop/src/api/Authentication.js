import { server_adress } from "./Config";

export default function Login(email, pass){
    return {email, pass};
}

export async function Register(email, pass, username){
    const response = await fetch(server_adress);
    const data = await response.json();
    return data;
}