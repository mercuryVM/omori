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
  
  window.onresize = VerificarMenu;