import { server_address } from "./Config";
import { RefreshToken } from "./TokenOperations";

export async function sendFriendRequest(username, token, receiverUsername) {
    const rawResponse = await fetch(server_address + "api/users/send-friend-req", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username, receiverUsername })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await sendFriendRequest(username, accessToken, receiverUsername) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function confirmRequest(username, token, pendingUsername) {
    const rawResponse = await fetch(server_address + "api/users/confirm-req", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username, pendingUsername })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await confirmRequest(username, accessToken, pendingUsername) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function ignoreFriendRequest(username, token, pendingUsername) {
    const rawResponse = await fetch(server_address + "api/users/ignore-friend-req", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username, pendingUsername })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await ignoreFriendRequest(username, accessToken, pendingUsername) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function removeFriend(username, token, removedUsername) {
    const rawResponse = await fetch(server_address + "api/users/remove-friend", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username, removedUsername })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await removeFriend(username, accessToken, removedUsername) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function cancelRequest(username, token, pendingUsername) {
    const rawResponse = await fetch(server_address + "api/users/cancel-req", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username, pendingUsername })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await cancelRequest(username, accessToken, pendingUsername) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}