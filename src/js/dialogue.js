const boxDialogo = document.getElementsByClassName("mainDialogo")[0];
const nameDialogo = document.getElementsByClassName("dialogName")[0];
const messageDialogo = document.getElementById("dialogMessage");
const setaDialogo = document.getElementById("dialogSeta");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var waitingEnter = false;

var dialogueResolve;

function MostrarDialogo(enviou, mensagem){
    return new Promise(async function (resolve) {
        nameDialogo.innerHTML = enviou;

        $("#setaBundle").css("opacity", "0");

        if(!enviou && !mensagem){
            $(boxDialogo).animate({
                opacity: 0,
              }, 500, async function() {
                resolve();
            });
            return;
        }

        if(!enviou) document.getElementsByClassName("dialogoNome")[0].style.display = "none";
        else document.getElementsByClassName("dialogoNome")[0].style.display = "block";

        function AnimateSeta(){
            return new Promise((resolve) =>{

                $(setaDialogo).animate({
                    marginRight: "20px"
                  }, 500, async function() {
                    $(setaDialogo).animate({
                        marginRight: "0"
                      }, 500, async function() {
                        resolve();
                    });
                });
            });
        }

        async function AnimateAgain(){
            if(!waitingEnter){
                dialogueResolve();
                return;
            } 

            await AnimateSeta();
            
            await AnimateAgain();
        }

        function EscreverMensagem(texto, mensagem){
            return new Promise(async function (resolve, reject) {
                if(texto && mensagem){
                    var actualMessage = "";
        
                    for(var i = 0; i < mensagem.length; i++){
                        actualMessage += mensagem[i];
                        await sleep(40);
                        texto.innerHTML = actualMessage;
                    }

                    waitingEnter = true;

                    dialogueResolve = resolve;

                    $("#setaBundle").animate({
                        opacity: 1
                    }, 500);

                    await AnimateAgain();

                    if(!waitingEnter) resolve();
                }else{
                    reject();
                }
            });
        }
    
        await EscreverMensagem(messageDialogo, mensagem);
        resolve();
    });
}

$(document).keypress(function(event){
    
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        if(waitingEnter){
            waitingEnter = false;
        }	
    }
    
});
