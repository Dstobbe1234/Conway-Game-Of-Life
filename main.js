const cnv = document.getElementById("cnv");
cnv.width = 700;
cnv.height = 600;
const ctx = cnv.getContext("2d");

const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", play);

document.addEventListener("mousedown", mousedownListener);



let cells = [];
let playing = false;

class cell {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.live = false;
        this.neighbours = []
    }
    checkNeighboors() {
        this.liveNeighbours = 0
        for(let i = 0; i < this.neighbours.length; i++) {
            if(this.neighbours[i].live) {
                this.liveNeighbours++
            }
        }

    } 
    lifeDeath() {
        if(this.live && this.liveNeighbours === 1 || this.liveNeighbours === 0) {
            this.live = false
        } else if(this.live && this.liveNeighbours === 4) {
            this.live = false;
        } else if (!this.live && this.liveNeighbours === 3) {
            this.live = true;
        }
        // if (this.x === 200 && this.y === 200) {
        //     for(let i = 0; i < this.neighbours.length; i++) {
        //         this.neighbours[i].live = true
        //     }
        // }
    }
    display() {
        if (this.live) {
            ctx.fillStyle = "yellow";
        } else {
            ctx.fillStyle = "grey";
        }
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
    getNeighbours([-1, 1, -36, -35, -34, 34, 35, 36])
}

function getNeighbours(num) {
    
    for(let i = 0; i < cells.length; i++) {
        for(let numIndex = 0; numIndex < num.length; numIndex++) {
            if (cells[i + num[numIndex]] !== undefined) {
                cells[i].neighbours.push(cells[i + num[numIndex]])
            }
        }
    }
    setInterval(loop, 200);
}

let mouse = {
    x: 0,
    y: 0,
} 


function mousedownListener(event) { 
    mouse.down = true
    mouse.x = event.x - cnv.getBoundingClientRect().x;
    mouse.y = event.y - cnv.getBoundingClientRect().y;
    placeCells()
}

function placeCells() {
    if(!playing) {
        for(let i = 0; i < cells.length; i++) {
            if (cells[i].x < mouse.x && mouse.x < cells[i].x + cells[i].w
                && cells[i].y < mouse.y && mouse.y < cells[i].y + cells[i].h) {
                if (cells[i].live) {
                    cells[i].live = false
                } else {
                    cells[i].live = true
                }
            }
        }
    }
}

function play() {
    if (!playing) {
        playing = true
    } else {
        playing = false
    }
}

function loop() {
    for(let i = 0; i < cells.length; i++) {
        if (playing) {
            cells[i].checkNeighboors()
        }
    }
    
    for(let i = 0; i < cells.length; i++) {
        if (playing) {
            cells[i].lifeDeath()
        }
        cells[i].display();
    }
    drawBackground()
}
 

createCells()
