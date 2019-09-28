import React from "react";

interface alertProps {
    message:string
}
const alert=function({message}:alertProps){
    let messageBox=document.createElement("div");
    messageBox.classList.add("message-box");
    let icon=document.createElement("i");
    icon.classList.add("fa","fa-info-circle","fa-lg");
    messageBox.append(icon);
    messageBox.append(message);
    setTimeout(function () {
        messageBox.remove();
    },2000);
    document.querySelector("#message-root").append(messageBox);
};

const Message = {
    alert
};

export {Message};