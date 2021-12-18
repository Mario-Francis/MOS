$(() => {
    var connection = new signalR.HubConnectionBuilder().withUrl("/notifyHub", { accessTokenFactory: () => getCookie('.Ecoperformance.AuthToken') }).build();

    //Disable send button until connection is established
    document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveMessage", function (user, message) {
        var li = document.createElement("li");
        document.getElementById("messagesList").appendChild(li);
        // We can assign user-supplied strings to an element's textContent because it
        // is not interpreted as markup. If you're assigning in any other way, you 
        // should be aware of possible script injection concerns.
        console.log(message);
        //li.textContent = `${user} says ${message}`;
        notify(message, 'info', user);
    });

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("sendButton").addEventListener("click", function (event) {
        var user = 'Mario';
        var message = 'Hello bro!';
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });

    $('#test').on('click', (e) => {
        fetch('/dashboard/test', { method: 'get' }).then((r) => {
            console.log(r);
        }).catch((er) => {
            console.log(er);
        });
    });
});