console.log("test passed!");
const ws = new WebSocket("ws://localhost:8000");

let counter = 0;

$("#message_sender").prop("disabled", true);

$("#message_sender").val(
  `you must click 10 hamster point to writing a messages.\nNow you click 0 times`
);
$("input").click((e) => {
  if (counter < 10) {
    $("#message_sender").val(
      `you must click 10 hamster point to writing a messages.\nNow you click ${counter++ + 1} times`
    );
    $("#message_sender").prop("disabled", true);
    return;
  }
  if (counter == 10) {
    $("#message_sender").val(
        ""
      );
      $("#message_sender").prop("disabled", false);
      alert("Now you can write message");
      counter++;
      return;
    }
  if ($("#message_inputer").val() == "" && $("#message_sender").val() == "") {
    alert("INPUT NAME AND MESSAGE!!!!!!!!!!");
    $("#message_inputer").css({ border: "red solid" });
    $("#message_sender").css({ border: "red solid" });
  } else if (
    $("#message_inputer").val() == "" ||
    $("#message_sender").val() == ""
  ) {
    if ($("#message_sender").val() == "") {
      $("#message_sender").css({ border: "red solid" });
      alert("PLEASE ENTER MESSAGE!!");
    } else {
      $("#message_sender").css({ border: "pink dotted" });
    }
    if ($("#message_inputer").val() == "") {
      $("#message_inputer").css({ border: "red solid" });
      alert("PLEASE ENTER NAME!!");
    } else {
      $("#message_inputer").css({ border: "pink dotted" });
    }
    return;
  } else {
    ws.send(`{"_type": "message", _info: "${$("#message_sender").val()}"}`);
    ws.send(`user: ${$("#message_inputer").val()}`);
    $("#message_sender").css({ border: "pink dotted" });
    $("#message_inputer").css({ border: "pink dotted" });
  }
});

ws.onmessage = (msg) => {
    // if (msg.data == `I LOVE SOCKET AND YOU TO BECAUSE I FEEL WEBSOCKET IN MY USEFOOL HEAD0`) {
    //     alert("0");
    // }
    if (msg._type == "message") {
        $("#message_wrapper").append(`<p>${msg._info}</p>`);
    }
    console.log("I give message!");
}