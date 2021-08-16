async function Intro(){
    MostrarDialogo("???", "");
    $("#body").css("overflow-y", "hidden");
    $(boxDialogo).animate({
        opacity: 1,
      }, 500, async function() {
        await MostrarDialogo("???", "Voce deseja aceitar nossas politicas de cookies, que no fim das contas nem existem?");
        await MostrarDialogo("", "");
        $(".cookiesWarn").css("display", "none");
        $("#body").css("overflow-y", "auto");
        $("#ost")[0].play();
        $("#ost")[0].volume = 0.25;
    });
}

function Musica(bool){
  if(bool) $("#ost")[0].play();
  else $("#ost")[0].pause();
}

Intro();

EnableHandler($("#imageOne"), "src/img/gamepics/1.jpg", "Omori e seus amigos no espaço branco.")

EnableHandler($("#imageTwo"), "src/img/gamepics/2.jpg", "Uma batalha contra um inimigo no jogo OMORI.")