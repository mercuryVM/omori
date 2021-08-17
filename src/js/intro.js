async function Intro() {
  MostrarDialogo("???", "");
  $("#body").css("overflow-y", "hidden");
  $(boxDialogo).animate({
    opacity: 1,
  }, 500, async function () {
    await MostrarDialogo("???", "Voce deseja aceitar nossas politicas de cookies, que no fim das contas nem existem?");
    await MostrarDialogo("", "");
    $(".cookiesWarn").css("display", "none");
    $("#body").css("overflow-y", "auto");
    $("#ost")[0].play();
    $("#ost")[0].volume = 0.25;
    $(".content").animate({
      opacity: 1
    }, 500);
  });
}

function Musica(bool) {
  if (bool) $("#ost")[0].play();
  else $("#ost")[0].pause();
}

$(document).ready(function () {

  $(window).scroll(function () {

    $('.box').each(function (i) {

      var bottom_of_object = $(this).position().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_object) {

        $(this).animate({ 'opacity': '1' }, 1500);

      }

    });

    $('.trailer').each(function (i) {

      var bottom_of_object = $(this).position().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_object) {

        $(this).animate({ 'opacity': '1' }, 1500);

      }

    });

  });

});

Intro();

EnableHandler($("#imageOne"), "src/img/gamepics/1.jpg", "OMORI e seus amigos.")

EnableHandler($("#imageTwo"), "src/img/gamepics/2.jpg", "Uma batalha contra um inimigo.")

EnableHandler($("#imageThree"), "src/img/gamepics/OMORI_playing_piano.gif", "OMORI tocando piano.")

EnableHandler($("#tag1"), "src/img/gamepics/REALYOU_TAGGED_KEL.png", "Foto retirada de OMORI e Kel.")
EnableHandler($("#tag2"), "src/img/gamepics/REALHERO_TAGGED_YOU.png", "Foto retirada de OMORI e Hero.")
EnableHandler($("#tag3"), "src/img/gamepics/DW_ALBUM_06.png", "Foto do album retirada de OMORI e Basil.")
EnableHandler($("#tag4"), "src/img/gamepics/TAG_AubreyOmori.png", "Foto retirada de OMORI e Aubrey.")

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
    await MostrarDialogo("", "");
    $(".cookiesWarn").css("display", "none");
    $("#body").css("overflow-y", "auto");
  });
});