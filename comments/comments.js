const socket = io("https://omori-backend.herokuapp.com/");

moment.locale("pt-br");

let messageList = [];

let loadedNow = false;

function DeleteMessage(message){
    const id = message.data._id.toString();
    if(!id) return;
    $("#" + id).remove();
}

socket.on("connect", () => {

    for (var i = messageList.length; i >= 0; i--) {
        const message = messageList[i];
        if (!message) continue;
        DeleteMessage(message);
    }

    messageList = []

    socket.emit("get");
})

socket.on("connect_error", () => {
    $("#loading").css("display", "block");
    loadedNow = false;
})

socket.on("disconnect", () => {
    $("#loading").css("display", "block");
    loadedNow=  false;
})

$("#loading").css("display", "block");

socket.on("too", () => {$("#tooMessages").css("display", "flex")})

socket.on("get", (data) => {
    if (!data) return;
    $("#loading").css("display", "none");
    loadedNow = true;
    try {
        data = JSON.parse(data);

        for (var i = data.length; i >= 0; i--) {
            const message = data[i];
            if (!message) continue;
            CreateMessage(message);
        }
    } catch (e) {
        console.error(e);
        socket.emit("get")
    }
})

socket.on("receive", (data) => {
    if(!data) return;

    if(!loadedNow) return;

    try {
        data = JSON.parse(data);

        CreateMessage(data)
    } catch (e) {
        console.error(e);
    }
})

let soma = 0;

for(var i = 101; i < 399; i++){
    if(i % 2 !== 0 && i % 3 !== 0 && i % 5 !== 0) {
        soma += i;
    }
}

console.log(soma)


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
            <span class="time">${moment(data.timestamp).calendar()}</span>
        </span>
        <span class="message">
            
        </span>
    </div>
</div>
    `)

    if(!objeto.dom) return;
    
    $("#" + data._id.toString()).find(".info").find(".message").text(data.message)

    messageList.push(objeto);

    /*
    if(messageList.length > 20){
        const oldMessage = messageList[0];
        if(!oldMessage) return;
        DeleteMessage(oldMessage);
        messageList = messageList.slice(1, messageList.length);
    }
    */
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
$("#basil").click(() => { SelectCharacter("basil") })
$("#kel").click(() => { SelectCharacter("kel") })
$("#mari").click(() => { SelectCharacter("mari") })
