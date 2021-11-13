const keyMap = new Map();
const character = $("#character");
let isWalking = false;
let nextMovement = false;
const itemSpace = new Map();
let playerOrientation = "up";

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
    }
}

function AddOccupiedSpace(x, y) {
    itemSpace.set(JSON.stringify({ x, y }), true);
}

AddOccupiedSpace(2, 1);
AddOccupiedSpace(4, 1);
AddOccupiedSpace(4, 3);

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

    if ((y - 1) <= 0 || (y - 1) >= 4 || (x + 1) > 4 || (x - 1) <= 0) {
        StopAnimation();
        console.log("is stoping")
        return;
    }

    if (Boolean(isPressing)) {
        if (context) {
            context(true);
        }
        else  StopAnimation();
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

    if (!CanWalk(x, y - 1)) {
        animationEnded = true;
        StopAnimation()
        return;
    }

    if ((y - 1) <= 0) {
        return;
    }

    if (isWalking && !isNext) {
        nextMovement = MoveUp;
        return;
    }
    isWalking = true;

    character.css("transform", "translate(0px, -6px)")

    actualPosition.y--;

    playerOrientation = "up";

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
            PlayQueriedMovements(MoveUp);
        })
}

let animationFrame = 0;

function StopAnimation() {
    isWalking = false;
    animationEnded = true;
    animationFrame = 1;
    PlayFrame();
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
    }
}

function MoveDown(isNext) {
    const { x, y } = actualPosition

    if (!CanWalk(x, y + 1)) {
        animationEnded = true;
        StopAnimation()
        return;
    }

    if ((y + 1) >= 4) {
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

    playerOrientation = "down";
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
            PlayQueriedMovements(MoveDown);
        })
}

function MoveRight(isNext) {
    const { x, y } = actualPosition;

    if (!CanWalk(x + 1, y)) {
        animationEnded = true;
        StopAnimation()
        return;
    }

    if ((x + 1) > 4) {
        return;
    }

    if (isWalking && !isNext) {
        nextMovement = MoveRight;
        return;
    }

    isWalking = true;

    character.css("transform", "translate(0px, -6px)")

    actualPosition.x++;
    playerOrientation = "right";

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
            PlayQueriedMovements(MoveRight);
        })
}

function MoveLeft(isNext) {
    const { x, y } = actualPosition

    if (!CanWalk(x - 1, y)) {
        animationEnded = true;
        StopAnimation()
        return;
    }

    if ((x - 1) < 1) {
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

    character.transition(
        { transform: "translate(-32px, -6px);" }
        , 350, "linear", () => {
            animationEnded = true;
            character.css("transform", "translate(0px, -6px)")
            character.css("grid-column", x - 1)
            PlayQueriedMovements(MoveLeft);
        })
}


keyMap.set("w", MoveUp)
keyMap.set("s", MoveDown)
keyMap.set("d", MoveRight)
keyMap.set("a", MoveLeft)

$(".whitespace").on('keydown', function (event) {
    if (!event.key) return;
    const key = event.key.toLowerCase()
    if (!keyMap.has(key)) return;
    if (isPressing !== false) {
        if (isPressing != key) return;
    }
    keyMap.get(key)()
    isPressing = key;
})

let isPressing = false;
let animationEnded = true;

$(".whitespace").on('keyup', function (event) {
    if (!event.key) return;
    const key = event.key.toLowerCase()
    if (!keyMap.has(key)) return;
    if (isPressing == key) {
        isPressing = false;
    }
})

GetCharacterPosition();