const socket = io("https://omori-backend.herokuapp.com/");

socket.on("connect", () => {
    socket.emit("get");
    $("#loading").css("display", "none");
})

socket.on("connect_error", () => {
    $("#loading").css("display", "block");
})

socket.on("disconnect", () => {
    $("#loading").css("display", "block");
})

$("#loading").css("display", "block");

let messageList = [];

socket.on("too", () => {$("#tooMessages").css("display", "flex")})

socket.on("get", (data) => {
    if (!data) return;

    try {
        data = JSON.parse(data);

        for (var i = data.length; i >= 0; i--) {
            const message = data[i];
            if (!message) continue;
            CreateMessage(message);
        }
    } catch (e) {
        console.error(e);
    }
})

socket.on("receive", (data) => {
    if(!data) return;


    try {
        data = JSON.parse(data);

        CreateMessage(data)
    } catch (e) {
        console.error(e);
    }
})

function CreateMessage(data) {
    if (!data) return;
    const objeto = {
        data,
        dom: false
    }

    const userMap = new Map();

    userMap.set(0, "../src/img/menuoptions/characters/omori.gif")    
    userMap.set(1, "../src/img/menuoptions/characters/aubrey.gif")    
    userMap.set(2, "../src/img/menuoptions/characters/hero.gif")    
    userMap.set(3, "../src/img/menuoptions/characters/basil.png")    
    userMap.set(4, "../src/img/menuoptions/characters/kel.gif")    
    userMap.set(5, "../src/img/menuoptions/characters/mari.png")    

    objeto.dom = $(".comments").append(`
    <div class="comment" id="${data._id.toString()}">
    <img src="${userMap.get(data.pic)}" height="96px">
    <div class="info">
        <span class="name">
            ${data.name}
            <span class="time">Hoje às 18:39</span>
        </span>
        <span class="message">
            ${data.message}
        </span>
    </div>
</div>
    `)

    if(!objeto.dom) return;

    messageList.push(objeto);

    if(messageList.length > 20){
        const oldMessage = messageList[0];
        if(!oldMessage) return;
        const id = oldMessage.data._id.toString();
        console.log(id);
        if(!id) return;
        $("#" + id).remove();
        messageList = messageList.slice(1, messageList.length);
    }
}

let selectedCharacter = false;

function SelectCharacter(id) {
    if (selectedCharacter) selectedCharacter.removeClass("selectedCharacter");
    selectedCharacter = $("#" + id);
    selectedCharacter.addClass("selectedCharacter");
    $("#character").val(id)
    console.log($("#character"))
}

$("#form").on("submit", function (e) {
    e.preventDefault();

    const character = $("#character").val();
    const name = $("#name").val().trim();
    const message = $("#message").val().trim();

    const userMap = new Map();

    userMap.set("omori", 0);
    userMap.set("aubrey", 1);
    userMap.set("hero", 2);
    userMap.set("basil", 3);
    userMap.set("kel", 4);
    userMap.set("mari", 5);

    const characterId = userMap.get(character);

    if (isNaN(characterId)) return;

    if (!name) return;

    if (!message) return;

    $("#tooMessages").css("display", "none")

    if (socket) socket.emit("send", characterId, name, message)
})

$("#omori").click(() => { SelectCharacter("omori") })
$("#aubrey").click(() => { SelectCharacter("aubrey") })
$("#hero").click(() => { SelectCharacter("hero") })
$("#basil").click(() => { SelectCharacter("kel") })
$("#mari").click(() => { SelectCharacter("mari") })