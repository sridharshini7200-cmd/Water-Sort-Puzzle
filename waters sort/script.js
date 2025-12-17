let bottles = [
    ["red", "blue", "red", "blue"],
    ["blue", "red", "blue", "red"],
    []
];

let selected = null;
let maxMoves = 20;
let movesLeft = maxMoves;

document.getElementById("moves").innerText = movesLeft;

function drawBottles() {
    let bottleDivs = document.getElementsByClassName("bottle");

    for (let i = 0; i < bottles.length; i++) {
        bottleDivs[i].innerHTML = "";

        for (let color of bottles[i]) {
            let layer = document.createElement("div");
            layer.className = "layer";
            layer.style.backgroundColor = color;
            bottleDivs[i].appendChild(layer);
        }
    }
}

function selectBottle(index) {
    if (movesLeft === 0) return;

    if (selected === null) {
        selected = index;
        document.getElementById("message").innerText =
            "Selected bottle " + (index + 1);
    } else {
        if (pour(selected, index)) {
            movesLeft--;
            document.getElementById("moves").innerText = movesLeft;
        }
        selected = null;
        drawBottles();
        checkGameStatus();
    }
}

function pour(from, to) {
    if (bottles[from].length === 0) return false;
    if (bottles[to].length === 4) return false;

    let color = bottles[from][bottles[from].length - 1];

    if (
        bottles[to].length === 0 ||
        bottles[to][bottles[to].length - 1] === color
    ) {
        bottles[from].pop();
        bottles[to].push(color);
        return true; // valid move
    }
    return false;
}

/* -------- WIN CHECK -------- */
function isSolved() {
    for (let bottle of bottles) {
        if (bottle.length === 0) continue;

        let first = bottle[0];
        for (let color of bottle) {
            if (color !== first) return false;
        }
    }
    return true;
}

/* -------- GAME STATUS -------- */
function checkGameStatus() {
    if (isSolved()) {
        document.getElementById("message").innerText =
            "🎉 You Win!";
    } else if (movesLeft === 0) {
        document.getElementById("message").innerText =
            "❌ You Lose! No moves left.";
    }
}

drawBottles();
