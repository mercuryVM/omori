const abrirImagemPanel = $("div.abrirImagem");
const imageSource = $("#openedImage");
const textComment = $("#imageComment");

function ShowImage(source, comment){
    textComment.text("\"" + comment + "\"");
    imageSource.attr("src", source);
    imageSource.attr("alt", comment);
    imageSource.attr("title", comment);
    abrirImagemPanel.css("display", "flex");
    abrirImagemPanel.animate({
        opacity: 1,
      }, 500, async function() {
        
    });
}

function CloseMenu(){
    abrirImagemPanel.animate({
        opacity: 0,
      }, 500, async function() {
        abrirImagemPanel.css("display", "none");
    });
}

$("#openedImageBack").click(CloseMenu);

abrirImagemPanel.click(CloseMenu);

function EnableHandler(button, source, comment){
    button.unbind("click");
    button.css("cursor", "pointer");
    button.attr("alt", comment);
    button.attr("title", comment);
    button.click(() =>{
        ShowImage(source, comment);
    });
}