function loadMessage(md) {
    const message = document.querySelector("#message");

    fetch("message.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            message.innerHTML = md.render(data); // Render markdown content
            console.log("Message loaded successfully");
        })
        .catch(error => {
            message.innerHTML = "Sorry, we couldn't load the message. Please try again later.";
            console.error("Error loading message:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const tempData = { did_open: false };

    const heart = document.querySelector("#solid-heart");
    const heartContainer = document.querySelector(".heart-container");
    const msgContainer = document.querySelector("#message-container");
    const audio = document.querySelector("#audio");

    const md = window.markdownit({ html: true });

    // Load the message from the text file
    loadMessage(md);

    heart.addEventListener("click", function () {
        if (!tempData.did_open) {
            tempData.did_open = true;

            // Show the message container
            msgContainer.style.display = "flex";

            // Adjust the heart container's margin
            heartContainer.style.marginTop = "-1.5%";

            // Play the music
            if (audio) {
                console.log("Playing music...");
                audio.play().catch((err) => {
                    console.error("Error playing music:", err);
                });
            }
        }
    });
});
