console.log("Main script started.");
let ws = new WebSocket("ws://104.237.150.24:1919");

var client = new Client(ws);

$("#sendmsg")[0].click = function() {
let chatinput = $("#cinput")[0];
client.chat(chatinput.value);
chatinput.value = "";
}
$("#sendmsg")[0].onclick = $("#sendmsg")[0].click;
$("#cinput").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#sendmsg").click();
    }
});
