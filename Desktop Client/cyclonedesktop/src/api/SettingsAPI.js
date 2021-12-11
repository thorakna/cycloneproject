import { server_address } from "./Config";
import { RefreshToken } from "./TokenOperations";

export async function getCredentials(username, token) {
    const rawResponse = await fetch(server_address + "api/users/get-credentials", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await getCredentials(username, accessToken) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function changeCredentials(username, token, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword) {
    const rawResponse = await fetch(server_address + "api/users/change-credentials", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await changeCredentials(username, accessToken, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}

export async function changePP(username, token, file, setProgress) {
    var fd = new FormData();
    fd.append("username", username);
    fd.append("userImage", file);
    //TODO: formdata düzgün gitmiyor olabilir? Postman düzgün gönderebiliyor burada bir sıkıntı var.
    //fd.enctype = "multipart/form-data";
    //fd.set("username", username);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", server_address+"api/users/change-image", false);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.setRequestHeader('token', token);
    xhr.upload.onprogress = function(e) {
      var percentComplete = Math.ceil((e.loaded / e.total) * 100);
      setProgress(percentComplete);
    };
    xhr.onload = async function () {
        console.log(xhr.response);
      if(this.status == 200) {
        const content = await xhr.response.json();
        if(content.status === "expired"){
            const RefreshStatus = await RefreshToken();
            var accessToken = localStorage.getItem("accessToken");
            return RefreshStatus ? await changePP(username, accessToken, file, setProgress) : {status:"fail", message: "The token couldn't be refreshed."};
        }else{
            return content;
        }
      }
    }
    
    xhr.send(fd);

    /*const rawResponse = await fetch(server_adress + "api/users/change-image", {
        method: 'POST',
        headers: {
            'token': token
        },
        body: fd
    }).then(data => {
        console.log(data)
      })
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await changePP(username, accessToken, file, setProgress) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }*/
}

export async function deletePP(username, token) {
    const rawResponse = await fetch(server_address + "api/users/delete-image", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ username })
    });
    const content = await rawResponse.json();
    if (content.status === "expired") {
        const RefreshStatus = await RefreshToken();
        var accessToken = localStorage.getItem("accessToken");
        return RefreshStatus ? await deletePP(username, accessToken) : { status: "fail", message: "The token couldn't be refreshed." };
    } else {
        return content;
    }
}