const boxDialogo = document.getElementsByClassName("mainDialogo")[0];
const nameDialogo = document.getElementsByClassName("dialogName")[0];
const messageDialogo = document.getElementById("dialogMessage");
const setaDialogo = document.getElementById("dialogSeta");
const typing = $("#typing");
let pleaseStop = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var waitingEnter = false;

let clicked = false;

var dialogueResolve;

function ClearDialogo(){
    nameDialogo.innerHTML = "";
    messageDialogo.innerHTML = "";
    $("div#dialogoNome").css("display", "none");
    $("#setaBundle").css("opacity", "0");
}

function MostrarDialogo(enviou, mensagem) {
    return new Promise(async function (resolve) {
        if(enviou)nameDialogo.innerHTML = enviou;
        else nameDialogo.innerHTML = "";

        $("#setaBundle").css("opacity", "0");

        if (!enviou) $("div#dialogoNome").css("display", "none");
        else $("div#dialogoNome").css("display", "block");

        if (!mensagem) {
            $(boxDialogo).animate({
                opacity: 0,
            }, 500, async function () {
                $(boxDialogo).css("opacity", 0)
                resolve();
            });
            return;
        }

        messageDialogo.innerHTML = "";

        function AnimateSeta() {
            return new Promise((resolve) => {

                $(setaDialogo).animate({
                    marginRight: "20px"
                }, 500, async function () {
                    $(setaDialogo).animate({
                        marginRight: "0"
                    }, 500, async function () {
                        resolve();
                    });
                });
            });
        }

        async function AnimateAgain() {
            if (!waitingEnter && !pleaseStop) {
                dialogueResolve();
                return;
            }

            await AnimateSeta();

            await AnimateAgain();
        }

        function EscreverMensagem(texto, mensagem) {
            return new Promise(async function (resolve, reject) {
                if (texto && mensagem) {
                    var actualMessage = "";
                    clicked = false;

                    for (var i = 0; i < mensagem.length; i++) {
                        if (clicked) {
                            typing[0].pause();
                            dialogueResolve = resolve;
                            resolve()
                            return;
                        }
                        actualMessage += mensagem[i];
                        typing[0].volume = 0.5;
                        typing[0].play();
                        await sleep(10);
                        texto.innerHTML = actualMessage;
                    }

                    waitingEnter = true;

                    dialogueResolve = resolve;

                    $("#setaBundle").animate({
                        opacity: 1
                    }, 500);

                    typing[0].pause();

                    await AnimateAgain();

                    if (!waitingEnter) resolve();
                } else {
                    reject();
                }
            });
        }

        await EscreverMensagem(messageDialogo, mensagem);
        resolve();
    });
}

$(document).keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        if (waitingEnter) {
            waitingEnter = false;
        } else {
            clicked = true;
        }
    }

});

$(boxDialogo).click(() => {
    if (waitingEnter) {
        waitingEnter = false;
    }else {
        clicked = true;
    }
})

$(".cookiesWarn").click(() => {
    if (waitingEnter) {
        waitingEnter = false;
    }else {
        clicked = true;
    }
})
