function loadMessage(md) {
    const message = document.querySelector("#message");

    fetch("message.txt")
        .then(response => response.text())
        .then(data => {
            message.innerHTML = md.render(data);
            adjustContainerHeight(); // Call the function to adjust container height
        })
        .catch(error => {
            message.innerHTML = "An error occurred while fetching the message";
        });
}

function adjustContainerHeight() {
    const msgContainer = document.querySelector("#message-container");
    const autoHeight = msgContainer.scrollHeight + 20; // 20 extra padding

    msgContainer.style.height = autoHeight + "px";
}

document.addEventListener('DOMContentLoaded', function() {
    let tempdata = {
        "did_open": false
    }

    const heart = document.querySelector("#solid-heart");
    const heart_container = document.querySelector(".heart-container");

    const md = window.markdownit({html: true});

    loadMessage(md);

    heart.addEventListener("click", function() {
        if (tempdata.did_open) {
            return;
        }
        tempdata.did_open = true;

        const msgContainer = document.querySelector("#message-container");
        msgContainer.style.display = "block";
        heart_container.style.marginTop = "-1.5%";

        adjustContainerHeight();
    });
});
