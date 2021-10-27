$("#menuBTN").click(() =>{
    if($(".mobileMenu").css("display") == "none") $(".mobileMenu").css("display", "block");
    else $(".mobileMenu").css("display", "none");
});

//VERIFICAR SE CLIQUE FOI FORA DO MENU

$(document).click(function(e){
    var target = $(e.target);

    if (!target.is('#menuBTN')) {
        $(".mobileMenu").css("display", "none");
    }
});

//FECHAR MENU MOBILE SE O TAMANHO DA TELA FOR MAIOR QUE 960PX

function VerificarMenu() {
    if(window.innerWidth > 960) $(".mobileMenu").css("display", "none");
}
  
$(".miau").click(() => {
    $(".cookiesWarn").css("display", "flex");
    $("#body").css("overflow-y", "hidden");
    MostrarDialogo("MEWO", " ");
    $(boxDialogo).animate({
      opacity: 1,
    }, 500, async function () {
      $("#meow")[0].play();
      $("#meow")[0].volume = 0.25;
      await MostrarDialogo("MEWO", "MEOW? (Esperando por algo acontecer?)")
      await MostrarDialogo("MEWO", "");
      $(".cookiesWarn").css("display", "none");
      $("#body").css("overflow-y", "auto");
    });
  });

  window.onresize = VerificarMenu;