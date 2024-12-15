const socket = io("/");

const user = prompt("Enter your name");

$(function () {
    // Show chat
    $("#show_chat").click(function () {
        $(".left-window").css("display", "none");
        $(".right-window").css("display", "block");
        $(".header_back").css("display", "block");
    });

    // Hide chat
    $(".header_back").click(function () {
        $(".left-window").css("display", "block");
        $(".right-window").css("display", "none");
        $(".header_back").css("display", "none");
    });

    // Send message on button click
    $("#send").click(function () {
        if ($("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    });

    // Send message on 'Enter' key
    $("#chat_message").keydown(function (e) {
        if (e.key == "Enter" && $("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    });
});

// Join room
socket.emit("join-room", ROOM_ID, null, user);

// Handle incoming messages
socket.on("createMessage", (message, userName) => {
    $(".messages").append(`
        <div class="message">
            <b><i class="far fa-user-circle"></i> <span> ${userName === user ? "me" : userName}</span> </b>
            <span>${message}</span>
        </div>
    `);
});
