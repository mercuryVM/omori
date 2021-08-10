async function Intro(){
    $(".music").trigger("play");
    MostrarDialogo("???", "");
    $(boxDialogo).animate({
        opacity: 1,
      }, 500, async function() {
        await MostrarDialogo("???", "Ao acessar esse site, nao ha mais volta.");
        await MostrarDialogo("???", "Diversas informacoes restritas estao presas aqui, e serao libertadas caso voce continue.");
        await MostrarDialogo("???", "Voce tem certeza que deseja continuar?");
        $('.video').get(0).pause();
        $('.video').css("display", "none");
        await MostrarDialogo("", "");
        $('#video2').get(0).play();
        $('#video2').css("display", "block");
        $('#video2').css("opacity", "0");
        $('#video2').animate({
            opacity: 1
        }, 500);
    });
}

Intro();