$("#menuBTN").click(() => {
  if ($(".mobileMenu").css("display") == "none") $(".mobileMenu").css("display", "block");
  else $(".mobileMenu").css("display", "none");
});

//VERIFICAR SE CLIQUE FOI FORA DO MENU

$(document).click(function (e) {
  var target = $(e.target);

  if (!target.is('#menuBTN')) {
    $(".mobileMenu").css("display", "none");
  }
});

//FECHAR MENU MOBILE SE O TAMANHO DA TELA FOR MAIOR QUE 960PX

function VerificarMenu() {
  if (window.innerWidth > 960) $(".mobileMenu").css("display", "none");
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

let images = [];

$(".content").find($("img")).each(function(){
  if($(this).attr("ignore")) return;

  if(this.src){
    images.push($(this));
    EnableHandler($(this), $(this).attr("src"), false)
  }
});

async function Intro(skip) {  
  if(skip){
    $(".cookiesWarn").css("display", "none");
    $("#body").css("overflow-y", "auto");
    $("#ost")[0].play();
    $("#ost")[0].volume = 0.25;
    $(".content").animate({
      opacity: 1
    }, 500);
    return;
  }

  if(!skip) MostrarDialogo("???", "");
  $("#body").css("overflow-y", "hidden");
  $(".cookiesWarn").css("display", "flex");
  $(boxDialogo).animate({
    opacity: 1,
  }, 500, async function () {
    if(!skip){
      await MostrarDialogo("???", "Voce deseja aceitar nossas politicas de cookies, que no fim das contas nem existem?");
      await MostrarDialogo("???", "");
    }
    $(".cookiesWarn").css("display", "none");
    $("#body").css("overflow-y", "auto");
    if($("#ost")[0]){
      $("#ost")[0].play();
      $("#ost")[0].volume = 0.25;
    }
    window.sessionStorage.setItem("skip", true)
    $(".content").animate({
      opacity: 1
    }, 500);
  });
}

function Musica(bool) {
  if (bool) $("#ost")[0].play();
  else $("#ost")[0].pause();
}

var skip = window.sessionStorage.getItem("skip");

Intro(skip ? true : false);

AOS.init()