const keyMap = new Map();
const character = $("#character");
let isWalking = false;
let nextMovement = false;
const itemSpace = new Map();
let playerOrientation = "up";
let stabbing = false;
let minigameLanguage = new Map();


let inventory = [];

let actualPosition = {
    x: 0,
    y: 0
}

const animations = {
    bottom: {
        idle: "/src/img/whitespace/omori walk/bottom/omori_idle.png",
        walk1: "/src/img/whitespace/omori walk/bottom/omori_walk_1.png",
        walk2: "/src/img/whitespace/omori walk/bottom/omori_walk_2.png",
    },
    up: {
        idle: "/src/img/whitespace/omori walk/up/omori_idle.png",
        walk1: "/src/img/whitespace/omori walk/up/omori_walk_1.png",
        walk2: "/src/img/whitespace/omori walk/up/omori_walk_2.png",
    },
    right: {
        idle: "/src/img/whitespace/omori walk/right/omori_idle.png",
        walk1: "/src/img/whitespace/omori walk/right/omori_walk_1.png",
        walk2: "/src/img/whitespace/omori walk/right/omori_walk_2.png",
    },
    left: {
        idle: "/src/img/whitespace/omori walk/left/omori_idle.png",
        walk1: "/src/img/whitespace/omori walk/left/omori_walk_1.png",
        walk2: "/src/img/whitespace/omori walk/left/omori_walk_2.png",
    }
}

const stabAnim = [
    "/src/img/whitespace/omori_stab/1.png",
    "/src/img/whitespace/omori_stab/2.png",
    "/src/img/whitespace/omori_stab/3.png",
    "/src/img/whitespace/omori_stab/4.png",
    "/src/img/whitespace/omori_stab/5.png",
    "/src/img/whitespace/omori_stab/6.png",
    "/src/img/whitespace/omori_stab/7.png",
    "/src/img/whitespace/omori_stab/8.png",
    "/src/img/whitespace/omori_stab/9.png",
    "/src/img/whitespace/omori_stab/10.png",
    "/src/img/whitespace/omori_stab/11.png",
    "/src/img/whitespace/omori_stab/12.png",
]

function AddOccupiedSpace(x, y) {
    itemSpace.set(JSON.stringify({ x, y }), true);
}

AddOccupiedSpace(2, 1);
AddOccupiedSpace(4, 1);
AddOccupiedSpace(4, 3);
AddOccupiedSpace(1,3);

function GetCharacterPosition() {
    const actualX = Math.floor(Number(character.css("grid-column") ? character.css("grid-column").replaceAll("/ auto", "").trim() : 0));
    const actualY = Math.floor(Number(character.css("grid-row") ? character.css("grid-row").replaceAll("/ auto", "").trim() : 0));

    actualPosition = {
        x: actualX,
        y: actualY
    }

    return actualPosition;
}

function CanWalk(x, y) {
    return !Boolean(itemSpace.get(JSON.stringify({ x, y })));
}

function PlayQueriedMovements(context) {
    const { y, x } = GetCharacterPosition()

    if(stabbing) return;

    if (Boolean(isPressing)) {
        if (context) {
            context(true);
        }
        else StopAnimation();
        return;
    }

    if (nextMovement instanceof Function) {
        isWalking = true;
        nextMovement(true);
        nextMovement = false;
        return;
    }

    StopAnimation();
}

function MoveUp(isNext) {
    const { x, y } = actualPosition

    playerOrientation = "up";

    if (!CanWalk(x, y - 1)) {
        animationEnded = true;
        StopAnimation()
        return;
    }

    if ((y - 1) <= 0) {
        if(!isWalking) StopAnimation()
        return;
    }

    if (isWalking && !isNext) {
        nextMovement = MoveUp;
        return;
    }
    isWalking = true;

    character.css("transform", "translate(0px, -6px)")

    actualPosition.y--;

    animationFrame++;
    if (animationFrame >= 4) animationFrame = 0;

    PlayFrame();

    animationEnded = false;

    character.transition(
        { transform: "translateY(-34px);" }
        , 350, "linear", () => {
            animationEnded = true;
            character.css("transform", "translate(0px, -6px)")
            character.css("grid-row", y - 1)
            if ((y - 2) <= 0) {
                StopAnimation()
                return;
            }
            PlayQueriedMovements(MoveUp);
        })
}

let animationFrame = 0;

function StopAnimation() {
    isWalking = false;
    animationEnded = true;
    animationFrame = 1;
    isPressing = false;
    nextMovement = false;
    PlayFrame();
    animationFrame = -1;
}

function PlayFrame() {
    switch (playerOrientation) {
        default:
            if (animationFrame === 0) character.attr("src", animations.bottom.walk1);
            else if (animationFrame === 1) character.attr("src", animations.bottom.idle);
            else if (animationFrame === 2) character.attr("src", animations.bottom.walk2);
            else if (animationFrame === 3) character.attr("src", animations.bottom.idle);
            break;
        case "up":
            if (animationFrame === 0) character.attr("src", animations.up.walk1);
            else if (animationFrame === 1) character.attr("src", animations.up.idle);
            else if (animationFrame === 2) character.attr("src", animations.up.walk2);
            else if (animationFrame === 3) character.attr("src", animations.up.idle);
            break;
        case "right":
            if (animationFrame === 0) character.attr("src", animations.right.walk1);
            else if (animationFrame === 1) character.attr("src", animations.right.idle);
            else if (animationFrame === 2) character.attr("src", animations.right.walk2);
            else if (animationFrame === 3) character.attr("src", animations.right.idle);
            break;
        case "left":
            if (animationFrame === 0) character.attr("src", animations.left.walk1);
            else if (animationFrame === 1) character.attr("src", animations.left.idle);
            else if (animationFrame === 2) character.attr("src", animations.left.walk2);
            else if (animationFrame === 3) character.attr("src", animations.left.idle);
            break;
        case "stab": 
            character.attr("src", stabAnim[animationFrame]);
        break;
    }
}

function MoveDown(isNext) {
    const { x, y } = actualPosition

    playerOrientation = "down";

    if (!CanWalk(x, y + 1)) {
        animationEnded = true;
        StopAnimation()
        return;
    }

    if ((y + 1) >= 4) {
        if(!isWalking) StopAnimation()
        return;
    }

    if (isWalking && !isNext) {
        nextMovement = MoveDown;
        return;
    }

    if (!isWalking) animationFrame = 0;

    isWalking = true;

    character.css("transform", "translate(0px, -6px)")

    actualPosition.y++;

    animationFrame++;
    if (animationFrame >= 4) animationFrame = 0;

    PlayFrame();

    animationEnded = false;

    character.transition(
        { transform: "translateY(22px);" }
        , 350, "linear", () => {
            animationEnded = true;
            character.css("transform", "translate(0px, -6px)")
            character.css("grid-row", y + 1)
            if ((y + 2) >= 4) {
                StopAnimation()
                return;
            }
            PlayQueriedMovements(MoveDown);
        })
}

function MoveRight(isNext) {
    const { x, y } = actualPosition;

    playerOrientation = "right";

    if (!CanWalk(x + 1, y)) {
        animationEnded = true;
        StopAnimation()
        return;
    }

    if ((x + 1) > 4) {
        if(!isWalking) StopAnimation()
        return;
    }

    if (isWalking && !isNext) {
        nextMovement = MoveRight;
        return;
    }

    isWalking = true;

    character.css("transform", "translate(0px, -6px)")

    actualPosition.x++;

    animationFrame = animationFrame += 1;
    if (animationFrame >= 4) animationFrame = 0;

    PlayFrame();

    animationEnded = false;

    character.transition(
        { transform: "translate(32px, -6px);" }
        , 300, "linear", () => {
            animationEnded = true;
            character.css("transform", "translate(0px, -6px)")
            character.css("grid-column", x + 1)
            if ((x + 2) > 4) {
                StopAnimation()
                return;
            }
            PlayQueriedMovements(MoveRight);
        })
}

function MoveLeft(isNext) {
    const { x, y } = actualPosition

    playerOrientation = "left";

    if (!CanWalk(x - 1, y)) {
        animationEnded = true;
        StopAnimation()
        return;
    }

    if ((x - 1) < 1) {
        if(!isWalking) StopAnimation()
        return;
    }

    if (!isWalking) animationFrame = 0;

    if (isWalking && !isNext) {
        nextMovement = MoveLeft;
        return;
    }

    isWalking = true;

    character.css("transform", "translate(0px, -6px)")

    actualPosition.x--;

    animationEnded = false;

    animationFrame++;
    if (animationFrame >= 4) animationFrame = 0;

    PlayFrame();

    character.transition(
        { transform: "translate(-32px, -6px);" }
        , 350, "linear", () => {
            animationEnded = true;
            character.css("transform", "translate(0px, -6px)")
            character.css("grid-column", x - 1)
            if ((x - 2) < 1) {
                StopAnimation()
                return;
            }
            PlayQueriedMovements(MoveLeft);
        })
}

let interacting = false;

const getLaptop = async () => {
    $("#laptop")[0].play();
    $("#laptop")[0].volume = 0.3;
    await MostrarDialogo(false, minigameLanguage.get("laptop.1"))
    await MostrarDialogo(false, minigameLanguage.get("laptop.2"))
    interacting = false;
  }

function Interact(){
    if(interacting) return;

    const {x,y} = GetCharacterPosition();

    if(playerOrientation === "left"){
        if(x === 1 && y === 3){
            interacting = true;
            ShowDialogues(
                async () => {
                    await getMewo();
                    interacting = false;
                }
            )
        }else if(x === 3 && y == 1){
            interacting = true;
            ShowDialogues(
                getLaptop
              );
        }else if(x === 2 && y === 3 && !inventory.includes("knife")){
            interacting = true;
            ShowDialogues(
                async () => {
                  inventory.push("knife");
                  await MostrarDialogo(false, minigameLanguage.get("knife_get"))
                  await MostrarDialogo(false, "")
                  interacting = false;
                  $("#knifeItem").css("display", "none");
                  $("#quest")[0].volume = 0.75;
                  $("#quest")[0].play();
                  $("#ost").attr("src", "/src/music/arachnopobia.mp3");
                  $("#ost")[0].play();
                  $("#quest")[0].play();
                  itemSpace.delete(JSON.stringify({x:1, y: 3}));
                }
              );
        }
    }else if(playerOrientation === "right"){
        if(x === 3 && y === 3){
            interacting = true;
            ShowDialogues(
                async () => {
                  await MostrarDialogo(false, minigameLanguage.get("sad_lenco"))
                  await MostrarDialogo(false, "")
                  interacting = false;
                }
              );
        }else if(x === 3 && y === 1){
            interacting = true;
            ShowDialogues(
                async () => {
                  await MostrarDialogo(false, minigameLanguage.get("draw"))
                  await MostrarDialogo(false, "")
                  interacting = false;
                }
              );
        }
        else if(x === 1 && y == 1){
            interacting = true;
            ShowDialogues(
                getLaptop
              );
        }
    }else if(playerOrientation === "up"){
        if(x === 2 && y === 2){
            interacting = true;
            ShowDialogues(
                getLaptop
              );
        }else if(x === 4 && y === 2){
            interacting = true;
            ShowDialogues(
                async () => {
                  await MostrarDialogo(false, minigameLanguage.get("draw"))
                  await MostrarDialogo(false, "")
                  interacting = false;
                }
              );
        }
    }else if(playerOrientation === "down"){
        if(x === 4 && y === 2){
            interacting = true;
            ShowDialogues(
                async () => {
                  await MostrarDialogo(false, minigameLanguage.get("sad_lenco"))
                  await MostrarDialogo(false, "")
                  interacting = false;
                }
              );
        }else if(x === 1 && y === 2 && !inventory.includes("knife")){
            interacting = true;
            ShowDialogues(
                async () => {
                  inventory.push("knife");
                  await MostrarDialogo(false, minigameLanguage.get("knife_get"))
                  await MostrarDialogo(false, "")
                  interacting = false;
                  $("#knifeItem").css("display", "none");
                  $("#quest")[0].volume = 0.75;
                  $("#quest")[0].play();
                  itemSpace.delete(JSON.stringify({x:1, y: 3}));
                }
              );
        }
    }
}

async function Stab(){
    if(!inventory.includes("knife")) return;

    playerOrientation = "stab";
    animationFrame = 0;
    stabbing = true;
    PlayFrame();
    $("")
    for(;animationFrame < 5; animationFrame++){
        await sleep(200);
        PlayFrame();
    }
    await sleep(2000);
    for(;animationFrame < 9; animationFrame++){
        await sleep(200);
        PlayFrame();
    }
    $("#ost")[0].pause()
    $("#stab")[0].play()
    $("#stab")[0].volume = 0.5;
    await sleep(5000);

    for(;animationFrame < 13; animationFrame++){
        await sleep(200);
        PlayFrame();
    }

    await sleep(5000);

    $("#ost").attr("src", "/src/music/acrophobia.mp3")
    $("#ost")[0].play();

    $("#body").css("overflow", "hidden");
    $("#body").css("background-color", "black")

    $(".main").animate({
        opacity: 0,
    }, 2000, async () => {
        $(".something").css("display", "flex");

        const messages = [
            "something.1",
            "something.2",
            "something.3",
            "something.4",
            "something.5",
            "something.6",
        ]

        let basilAnimation = [
            "/src/img/basilhelp/player_please_help_1_01.gif",
            "/src/img/basilhelp/player_please_help_1_02.gif",
            "/src/img/basilhelp/player_please_help_1_03.gif",
        ]

        let messageNow = 0;

        $(".cookiesWarn").find("#dialogMessage").css("font-family", "OMORI")

        ShowDialogues(async () => {
            for(;;) {
                $("#body").css("overflow", "hidden");
                $("#body")[0].scrollTop = 0;
                await MostrarDialogo("???", minigameLanguage.get(messages[messageNow]));
                if(messageNow + 1 != messages.length) messageNow++;
            }
        });

        let animation = 0;

        for(var i = 0; i < 32; i++){
            await sleep(175);
            animation++;
            if(animation === basilAnimation.length) animation = 0;
            $("#something").attr("src", basilAnimation[animation]);
        }

        basilAnimation = [
            "/src/img/basilhelp/player_please_help_1_04.gif",
            "/src/img/basilhelp/player_please_help_1_05.gif",
            "/src/img/basilhelp/player_please_help_1_06.gif",
        ]

        for(var i = 0; i < 32; i++){
            await sleep(175);
            animation++;
            if(animation >= basilAnimation.length) animation = 0;
            $("#something").attr("src", basilAnimation[animation]);
        }

        basilAnimation = [
            "/src/img/basilhelp/player_please_help_1_07.gif",
            "/src/img/basilhelp/player_please_help_1_08.gif",
            "/src/img/basilhelp/player_please_help_1_09.gif",
        ]

        for(var i = 0; i < 32; i++){
            await sleep(175);
            animation++;
            if(animation >= basilAnimation.length) animation = 0;
            $("#something").attr("src", basilAnimation[animation]);
        }

        basilAnimation = [
            "/src/img/basilhelp2/player_please_help_2_04.gif",
            "/src/img/basilhelp2/player_please_help_2_05.gif",
            "/src/img/basilhelp2/player_please_help_2_06.gif",
        ]

        for(var i = 0; i < 32; i++){
            await sleep(175);
            animation++;
            if(animation >= basilAnimation.length) animation = 0;
            $("#something").attr("src", basilAnimation[animation]);
        }

        basilAnimation = [
            "/src/img/basilhelp2/player_please_help_2_07.gif",
            "/src/img/basilhelp2/player_please_help_2_08.gif",
            "/src/img/basilhelp2/player_please_help_2_09.gif",
        ]

        for(var i = 0; i < 16; i++){
            await sleep(175);
            animation++;
            if(animation >= basilAnimation.length) animation = 0;
            $("#something").attr("src", basilAnimation[animation]);
        }

        basilAnimation = [
            "/src/img/blackspace/fa_horror_2_01.png",
            "/src/img/blackspace/fa_horror_2_02.png",
            "/src/img/blackspace/fa_horror_2_03.png",
        ]

        for(var i = 0; i < 8; i++){
            await sleep(175);
            animation++;
            if(animation >= basilAnimation.length) animation = 0;
            $("#something").attr("src", basilAnimation[animation]);
        }

        $(".cookiesWarn").css("display", "none");

        $("#somethingDS")[0].play();

        $("#ost")[0].pause();

        basilAnimation = [
            "/src/img/blackspace/fa_horror_2_04.png",
            "/src/img/blackspace/fa_horror_2_05.png",
            "/src/img/blackspace/fa_horror_2_06.png",
            "/src/img/blackspace/fa_horror_2_07.png",
            "/src/img/blackspace/fa_horror_2_08.png",
            "/src/img/blackspace/fa_horror_2_09.png",
        ]

        animation = 0;

        pleaseStop = true;

        for(;;){
            await sleep(100);
            animation++;
            if(animation >= basilAnimation.length) {
                break;
            }
            $("#something").attr("src", basilAnimation[animation]);
        }

        $(".something").css("display", "none");

        await sleep(5000);
        window.location.reload();
    })
}

keyMap.set("w", MoveUp)
keyMap.set("s", MoveDown)
keyMap.set("d", MoveRight)
keyMap.set("a", MoveLeft)
keyMap.set("z", Interact)
keyMap.set("escape", Stab)
keyMap.set("enter", Interact)

$(".whitespace").on('keydown', function (event) {
    if (!event.key) return;
    if(stabbing) return;

    const key = event.key.toLowerCase()
    
    if (!keyMap.has(key)) return;
    if (isPressing !== false) {
        if (isPressing != key) {
            return;
        }
    }

    if(!isWalking) animationFrame = -1;
    if(interacting) return;
    $("#walkTip").css("display", "none")
    keyMap.get(key)()
    isPressing = key;
})

let isPressing = false;
let animationEnded = true;

$(".whitespace").on('keyup', function (event) {
    if (!event.key) return;
    if(stabbing) return;
    const key = event.key.toLowerCase()
    if (!keyMap.has(key)) return;
    if (isPressing == key) {
        isPressing = false;
    }
})

GetCharacterPosition();