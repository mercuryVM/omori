const abrirImagemPanel = $("div.abrirImagem");
const imageSource = $("#openedImage");
const textComment = $("#imageComment");

function ShowImage(source, comment){
    if(comment) textComment.text("\"" + comment + "\"");
    else textComment.text("");
    imageSource.attr("src", source);
    imageSource.attr("alt", textComment.text());
    imageSource.attr("title", textComment.text());
    abrirImagemPanel.css("display", "flex");
    abrirImagemPanel.animate({
        opacity: 1,
      }, 500, async function() {
        abrirImagemPanel.css("opacity", 1)
    });
}

function CloseMenu(){
    abrirImagemPanel.animate({
        opacity: 0,
      }, 500, async function() {
        abrirImagemPanel.css("display", "none");
        abrirImagemPanel.css("opacity", 0)
    });
}

$("#openedImageBack").click(CloseMenu);

abrirImagemPanel.click(CloseMenu);

function EnableHandler(button, source, comment){
    button.unbind("click");
    button.css("cursor", "pointer");
    button.css("pointer-events", "all");
    if(comment) button.attr("alt", comment);
    if(comment) button.attr("title", comment);
    button.click(() =>{
        ShowImage(source, comment);
    });
}