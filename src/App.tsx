import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const rowStyle = {
    display: "flex",
  };

  const squareStyle = {
    width: "60px",
    height: "60px",
    backgroundColor: "#ddd",
    margin: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: "#000",
  };

  const boardStyle = {
    backgroundColor: "#eee",
    width: "208px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    border: "3px #eee solid",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };

  const instructionsStyle = {
    marginTop: "5px",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const buttonStyle = {
    marginTop: "15px",
    marginBottom: "16px",
    width: "80px",
    height: "40px",
    backgroundColor: "#8acaca",
    color: "white",
    fontSize: "16px",
  };

  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7]
  ]

  const checkWinner = (player) => {
    if (player.length < 3) {
      return false
    }
    const resultsCheked = winningCombinations.some(combination => {
      const match = combination.every(item => player.includes(item))
      return match
    });
    return resultsCheked
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );

  function Square({ squareId, onSelectedSquare, playerX, playerO, winner }) {
    const [player, setPlayer] = useState('')
    useEffect(() => {
      if (playerX.length === 0 && playerO.length === 0) {
        setPlayer('')
        return
      }
      getPlayer()
    }, [playerX, playerO])

    const onClickSquare = () => {
      if (player || winner) {
        return
      }
      onSelectedSquare(squareId)
    }

    const getPlayer = () => {
      if (playerX.some(position => position === squareId)) {
        setPlayer("X")
      } else if (playerO.some(position => position === squareId)) {
        setPlayer("O")
      }
    }

    return <div className="square" style={squareStyle} onClick={onClickSquare}>{player}</div>;
  }

  function Board() {
    const [player, setPlayer] = useState("X");
    const [winner, setWinner] = useState("");

    const [playerX, setPlayerX] = useState([])
    const [playerO, setPlayerO] = useState([])

    const resetBoard = () => {
      setWinner("");
      setPlayer("X");
      setPlayerX([])
      setPlayerO([])
    };

    const onSelectedSquare = (squareId) => {
      if (player === "X") {
        setPlayerX([...playerX, squareId])
        setPlayer("O")
      } else if (player === "O") {
        setPlayerO([...playerO, squareId])
        setPlayer("X")
      }
    }

    useEffect(() => {
      const isWinnerX = checkWinner(playerX)
      if (isWinnerX) {
        setWinner("X")
        return
      }
      const isWinnerO = checkWinner(playerO)
      if (isWinnerO) {
        setWinner("O")
        return
      }
    }, [playerX, playerO])

    return (
      <div style={containerStyle} className="gameBoard">
        {Boolean(winner) ? (
          <div id="winnerArea" className="winner" style={instructionsStyle}>
            Winner: <span>{winner}</span>
          </div>
        ) : (
          <div id="statusArea" className="status" style={instructionsStyle}>
            Next player: <span>{player}</span>
          </div>
        )}
        <button style={buttonStyle} onClick={resetBoard}>
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square squareId={1} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
            <Square squareId={2} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
            <Square squareId={3} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square squareId={4} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
            <Square squareId={5} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
            <Square squareId={6} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square squareId={7} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
            <Square squareId={8} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
            <Square squareId={9} onSelectedSquare={onSelectedSquare} playerX={playerX} playerO={playerO} winner={winner} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
