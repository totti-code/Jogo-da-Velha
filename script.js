const cells = Array.from(document.querySelectorAll(".cell"));
const statusEl = document.getElementById("status");

const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const scoreDEl = document.getElementById("scoreD");

const btnReset = document.getElementById("btnReset");
const btnNew = document.getElementById("btnNew");

let board = Array(9).fill("");
let current = "X";
let gameOver = false;

let scoreX = 0, scoreO = 0, scoreD = 0;

const wins = [
  [0,1,2],[3,4,5],[6,7,8], // linhas
  [0,3,6],[1,4,7],[2,5,8], // colunas
  [0,4,8],[2,4,6]          // diagonais
];

function setStatus(text){
  statusEl.innerHTML = text;
}

function render(){
  cells.forEach((c, i) => {
    c.textContent = board[i];
    c.disabled = gameOver || board[i] !== "";
  });

  scoreXEl.textContent = scoreX;
  scoreOEl.textContent = scoreO;
  scoreDEl.textContent = scoreD;

  if (!gameOver) setStatus(`Vez de: <strong>${current}</strong>`);
}

function checkWinner(){
  for (const [a,b,c] of wins){
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      return board[a]; // "X" ou "O"
    }
  }
  return null;
}

function isDraw(){
  return board.every(v => v !== "");
}

function endGame(message){
  gameOver = true;
  setStatus(message);
  render();
}

function play(index){
  if (gameOver) return;
  if (board[index] !== "") return;

  board[index] = current;

  const winner = checkWinner();
  if (winner){
    if (winner === "X") scoreX++;
    if (winner === "O") scoreO++;
    return endGame(`✅ Vitória de: <strong>${winner}</strong>`);
  }

  if (isDraw()){
    scoreD++;
    return endGame(`🤝 Deu empate!`);
  }

  current = current === "X" ? "O" : "X";
  render();
}

function resetRound(){
  board = Array(9).fill("");
  current = "X";
  gameOver = false;
  render();
}

function resetAll(){
  scoreX = 0; scoreO = 0; scoreD = 0;
  resetRound();
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const i = Number(cell.dataset.i);
    play(i);
  });
});

btnReset.addEventListener("click", resetRound);
btnNew.addEventListener("click", resetAll);

render();
