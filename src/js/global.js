$("#menuBTN").click(() => {
  if ($("#mobileMenu").css("display") == "none") {
    disableAllMenus()
    $("body").css("overflow", "hidden");
    $("#menuBTN").text("close");
    $("#mobileMenu").css("display", "flex");
  }
  else {
    $(".mobileMenu").css("display", "none");
    $("body").css("overflow", "auto");
    disableAllMenus()
  }
});

const enableMenu = (id) => {
  $(id).css("display", "flex");
}

const disableMenu = (id) => {
  $(id).css("display", "none");
  $("#menuBTN").text("menu");
}

const disableAllMenus = () => {
  disableMenu("#charactersMobileMenu")
  disableMenu("#historyMobileMenu")
  disableMenu("#worldsMobileMenu")
}

$("#opencharactersMobileMenu").click(() => {
  $(".mobileMenu").css("display", "none");
  enableMenu("#charactersMobileMenu")
})

$("#openhistoryMobileMenu").click(() => {
  $(".mobileMenu").css("display", "none");
  enableMenu("#historyMobileMenu")
})

$("#openworldsMobileMenu").click(() => {
  $(".mobileMenu").css("display", "none");
  enableMenu("#worldsMobileMenu")
})

//VERIFICAR SE CLIQUE FOI FORA DO MENU

$(document).click(function (e) {
  var target = $(e.target);
  if (!target.is('#menuBTN') && !target.attr("hassubmenu") && !target.is(".mobileMenu")) {
    $(".mobileMenu").css("display", "none");
    $("body").css("overflow", "auto");
    disableAllMenus()
  }
});

//FECHAR MENU MOBILE SE O TAMANHO DA TELA FOR MAIOR QUE 960PX

function VerificarMenu() {
  if (window.innerWidth > 960) {
    $(".mobileMenu").css("display", "none");
    $("body").css("overflow", "auto");
    disableAllMenus()

    FixContentHeader()
  }
}

async function ShowDialogues(toCall) {
  $(".cookiesWarn").css("display", "flex");
  $("#body").css("overflow-y", "hidden");
  ClearDialogo();
  $(boxDialogo).animate({
    opacity: 1,
  }, 500, async function () {
    await toCall();
    $(".cookiesWarn").css("display", "none");
    $("#body").css("overflow-y", "auto");
  })
}

let mewoDialogue = 0;

const getMewo = async () => {
  $("#meow")[0].play();
    $("#meow")[0].volume = 0.5;

    try{
      if(inventory.includes("knife")){
        if(mewoDialogue === 0) {
          await MostrarDialogo("MEWO", minigameLanguage.get("mewo.1"))
        }else if(mewoDialogue === 1){
          await MostrarDialogo("MEWO", minigameLanguage.get("mewo.2"))
        }else if(mewoDialogue === 2){
          await MostrarDialogo("MEWO", minigameLanguage.get("mewo.3"))
        }else if(mewoDialogue === 3){
          await MostrarDialogo("MEWO", minigameLanguage.get("mewo.4"))
        }else {
          await MostrarDialogo("MEWO", minigameLanguage.get("mewo"))
        }
  
        mewoDialogue++;
      }else {
        await MostrarDialogo("MEWO", minigameLanguage.get("mewo"))
      }
    }catch(e){
      await MostrarDialogo("MEWO", "MEOW? (Esperando por algo acontecer?)")
    }finally {
      await MostrarDialogo("MEWO", "");
    }
}

$(".miau").click(() => {
  ShowDialogues(
    getMewo
  );
});

window.onresize = VerificarMenu;

let images = [];

$(".content").find($("img")).each(function () {
  if ($(this).attr("ignore")) return;

  if (this.src) {
    images.push($(this));
    EnableHandler($(this), $(this).attr("src"), false)
  }
});

$(".header").find($("a")).each(function () {
  if ($(this).attr("href")) {
    const href = $(this).attr("href");

    const path = window.location.pathname.replace("index.html", "");

    if (path === href || (href === "/" && path === "/index.html") || (path=== href + "/")) {
      $(this).find(".info").addClass("selected");
      $(this).find(".subMenuOption").addClass("subMenuSelected")

      $(this).attr("href", "#")
    }
  }
});


$(".mobileMenu").find($("a")).each(function () {
  if ($(this).attr("href")) {
    const href = $(this).attr("href");
    if (window.location.pathname === href || (href === "/" && window.location.pathname === "/index.html") || (window.location.pathname === href + "/")) {
      $(this).find(".btn").addClass("selected");

      $(this).attr("href", "#")
    }
  }
});

async function Intro(skip) {
  if (skip) {
    $(".cookiesWarn").css("display", "none");
    $("#body").css("overflow-y", "auto");
    $("#ost")[0].play();
    $("#ost")[0].volume = 0.25;
    $(".content").animate({
      opacity: 1
    }, 500);
    return;
  }

  if (!skip) MostrarDialogo("???", "");
  $("#body").css("overflow-y", "hidden");
  $(".cookiesWarn").css("display", "flex");
  $(boxDialogo).animate({
    opacity: 1,
  }, 500, async function () {
    if (!skip) {
      try{
        await MostrarDialogo("???", minigameLanguage.get("cookies"));
      }catch(e){
        await MostrarDialogo("???", "Você deseja aceitar nossas políticas de cookies que no fim das contas nem existem?");
      }finally {
        await MostrarDialogo("???", "");
      }
    }
    $(".cookiesWarn").css("display", "none");
    $("#body").css("overflow-y", "auto");
    if ($("#ost")[0]) {
      $("#ost")[0].play();
      $("#ost")[0].volume = 0.25;
    }
    window.sessionStorage.setItem("skip", true)
    FixContentHeader()
    $(".content").animate({
      opacity: 1
    }, 500);
  });
}

function Musica(bool) {
  if (bool) $("#ost")[0].play();
  else $("#ost")[0].pause();
}

let changed = false;

function FixContentHeader(){
  const height = $(".header")[0].clientHeight;

  if(!isNaN(height)){
    let oldScrollTop = $("#body")[0].scrollTop;

    $(".content").css("padding-top", (height + 20) + "px");
    $("#body")[0].scrollTop = oldScrollTop;
  }
}

$('a').click(function(e){
  var id = $(this).attr('href')

  if(id[0] !== "#") return;

  e.preventDefault()

  targetOffset = $(id).offset().top,
  menuheight = $('.header').innerHeight();
  $('html, body').animate({ //animação
      scrollTop: targetOffset - menuheight - 20
  }, 500);
});

var skip = window.sessionStorage.getItem("skip");

Intro(skip ? true : false);

AOS.init()

FixContentHeader()

setTimeout(() => {
  FixContentHeader()
}, 1)