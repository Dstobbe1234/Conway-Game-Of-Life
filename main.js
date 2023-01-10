const cnv = document.getElementById("cnv");
cnv.width = 600;
cnv.height = 600;
const ctx = cnv.getContext("2d");

const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", play);

document.addEventListener("mousedown", mousedownListener);

let cells = [];
let playing = false;

class cell {
  constructor(x, y, w, h, pos) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pos = pos;
    this.live = false;
    this.neighbours = [];
  }
  findNeighboors() {
    if (
      this.x !== cnv.width + 5 * 20 &&
      this.x !== -5 * 20 &&
      this.y !== cnv.height + 5 * 20 &&
      this.y !== -5 * 20
    ) {
      console.log("EE");
      for (let i = 0; i < cells.length; i++) {
        if (
          (cells[i].pos[0] == this.pos[0] - 1 && cells[i].pos[1] == this.pos[1]) ||
          (cells[i].pos[0] == this.pos[0] + 1 && cells[i].pos[1] == this.pos[1]) ||
          (cells[i].pos[0] == this.pos[0] && cells[i].pos[1] == this.pos[1] - 1) ||
          (cells[i].pos[0] == this.pos[0] && cells[i].pos[1] == this.pos[1] + 1) ||
          (cells[i].pos[0] == this.pos[0] + 1 && cells[i].pos[1] == this.pos[1] + 1) ||
          (cells[i].pos[0] == this.pos[0] - 1 && cells[i].pos[1] == this.pos[1] - 1) ||
          (cells[i].pos[0] == this.pos[0] - 1 && cells[i].pos[1] == this.pos[1] + 1) ||
          (cells[i].pos[0] == this.pos[0] + 1 && cells[i].pos[1] == this.pos[1] - 1)
        ) {
          this.neighbours.push(cells[i]);
        }
      }
    }
  }
  checkNeighboors() {
    this.liveNeighbours = 0;
    for (let i = 0; i < this.neighbours.length; i++) {
      if (this.neighbours[i].live) {
        this.liveNeighbours++;
      }
    }
  }
  lifeDeath() {
    if (this.live && this.liveNeighbours < 2) {
      this.live = false;
    } else if (this.live && this.liveNeighbours === 4) {
      this.live = false;
    } else if (!this.live && this.liveNeighbours === 3) {
      this.live = true;
    }
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
  for (y; y < cnv.height; y += 20) {
    x = 0;
    for (x; x < cnv.width; x += 20) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y, 20, 20);
    }
  }
}

function createCells() {
  for (let y = -5 * 20; y < cnv.height + 5 * 20; y += 20) {
    for (let x = 0; x < cnv.width + 5 * 20; x += 20) {
      cells.push(new cell(x, y, 20, 20, [x / 20, y / 20]));
    }
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].findNeighboors();
  }

  setInterval(loop, 200);
}

let mouse = {
  x: 0,
  y: 0,
};

function mousedownListener(event) {
  mouse.down = true;
  mouse.x = event.x - cnv.getBoundingClientRect().x;
  mouse.y = event.y - cnv.getBoundingClientRect().y;
  placeCells();
}

function placeCells() {
  if (!playing) {
    for (let i = 0; i < cells.length; i++) {
      if (
        cells[i].x < mouse.x &&
        mouse.x < cells[i].x + cells[i].w &&
        cells[i].y < mouse.y &&
        mouse.y < cells[i].y + cells[i].h
      ) {
        if (cells[i].live) {
          cells[i].live = false;
        } else {
          cells[i].live = true;
        }
      }
    }
  }
}

function play() {
  if (!playing) {
    playing = true;
  } else {
    playing = false;
  }
}

function loop() {
  for (let i = 0; i < cells.length; i++) {
    if (playing) {
      cells[i].checkNeighboors();
    }
  }

  for (let i = 0; i < cells.length; i++) {
    if (playing) {
      cells[i].lifeDeath();
    }
    cells[i].display();
  }
  drawBackground();
}

createCells();
