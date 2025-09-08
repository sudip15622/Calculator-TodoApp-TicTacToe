import { useState } from 'react'
import "./Tictactoe.css"

function Squarebox({ value, onsquareclick }) {

  return (
    <div className="box" onClick={onsquareclick} >{value}</div>
  )
}

export default function App() {
  const [xIsNext, setxIsNext] = useState(true);
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [timetravel, settimetravel] = useState([]);

  function handleclick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    let stepprev = [...timetravel];
    stepprev[0] = ({
      value: nextSquares[i],
      index: i
    })
    
    settimetravel(stepprev);
    setsquares(nextSquares);
    setxIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="ticcontainer">
      <div className="status">{status}</div>

      <div className="gametable">
        <div className="rows row1">
          <Squarebox value={squares[0]} onsquareclick={() => handleclick(0)} />
          <Squarebox value={squares[1]} onsquareclick={() => handleclick(1)} />
          <Squarebox value={squares[2]} onsquareclick={() => handleclick(2)} />
        </div>
        <div className="rows row2">
          <Squarebox value={squares[3]} onsquareclick={() => handleclick(3)} />
          <Squarebox value={squares[4]} onsquareclick={() => handleclick(4)} />
          <Squarebox value={squares[5]} onsquareclick={() => handleclick(5)} />
        </div>
        <div className="rows row3">
          <Squarebox value={squares[6]} onsquareclick={() => handleclick(6)} />
          <Squarebox value={squares[7]} onsquareclick={() => handleclick(7)} />
          <Squarebox value={squares[8]} onsquareclick={() => handleclick(8)} />
        </div>
      </div>
      <div className="restartgame">
        <button className='ticbtn' onClick={() => {
          setxIsNext(true);
          setsquares(Array(9).fill(null));
          settimetravel("")
        }}>Restart</button>
      </div>
      <div className="timetravel">
        {timetravel.length == 0 ? <div className='emptymove'>No moves yet</div> : timetravel.map(step=>{
          return (
            <div key={step.index} className="step">Player-{step.value} move to box-{step.index + 1}</div>
          )
        })}
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

