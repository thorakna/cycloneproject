import { server_address } from "./Config";
import { RefreshToken } from "./TokenOperations";

export async function getSearchData(username, token, entry, page) {
    const rawResponse = await fetch(server_address + "api/users/search", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username, entry, page })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await getSearchData(username, accessToken, entry) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}