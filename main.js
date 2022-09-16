const cnv = document.getElementById("cnv");
cnv.width = 700;
cnv.height = 600;
const ctx = cnv.getContext("2d");

const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", play);

document.addEventListener("mousedown", mousedownListener);



let cells = [];

class cell {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.live = false;
        this.neighboors = []
    }
    checkNeighboors() {
        let liveNeighboors = 0
        for(let i = 0; i < this.neighboors; i++) {
            if(this.neighboors[i].live) {
                liveNeighboors++
            }
        }
        if (!this.live) {
            if(liveNeighboors == 3) {
                this.live = true
            }
        } else {
            if(liveNeighboors < 2) {
                this.live = false
            } else if(liveNeighboors == 4) {
                this.live = false
            }
        }
    }
    display() {
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

}

function drawBackground() {
    let x = 0;
    let y = 0;
    for(y; y < cnv.height; y+=20) {
        x = 0
        for(x; x < cnv.width; x+=20) {
            ctx.strokeStyle = "black"
            ctx.strokeRect(x, y, 20, 20)
        }
    }
}

function createCells() {
    let x = 0;
    let y = 0;
    for(y; y < cnv.height; y+=20) {
        x = 0
        for(x; x < cnv.width; x+=20) {
            cells.push(new cell(x, y, 20, 20));
        }
    }

    for(let i = 0; i < cells.length; i++) {
            if (cells[i - 1] !== undefined) {
                cells[i].neighboors.push(cells[i - 1])
            }
            if (cells[i + 1] !== undefined) {
                cells[i].neighboors.push(cells[i + 1])
            }
            if (cells[i - 36] !== undefined) {
                cells[i].neighboors.push(cells[i - 36])
            }
            if (cells[i + 36] !== undefined) {
                cells[i].neighboors.push(cells[i + 36])
            }
    }
    requestAnimationFrame(loop);
}


function mousedownListener(event) { 
    let mouseX = event.x - cnv.getBoundingClientRect().x;
    let mouseY = event.y - cnv.getBoundingClientRect().y;
}



function loop() {
    for(let i = 0; i < cells.length; i++) {
        cells[i].checkNeighboors()
        cells[i].display();
    }
    drawBackground()

    requestAnimationFrame(loop);
}

function play() {

}
 
createCells()
