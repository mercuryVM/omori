axios.get("https://api.omori-game.com/gallery").then((response) => {
    const {data} = response;
    for(var i = 0; i < data.length; i++){
        //const previewSrc = "https://api.omori-game.com" + data[i][2][2];
        const fullResSrc = "https://api.omori-game.com" + data[i][3][2];

        $(".imagecontainer").prepend(`
            <div class="galleryPhoto">
                <img src="${fullResSrc}" id="gallery-img-${i}" />
            </div>
        `);
        EnableHandler($(`#gallery-img-${i}`), fullResSrc, false)
        
    }

    $("#loading").css("display", "none")
})