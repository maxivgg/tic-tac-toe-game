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

    const initialGame = {
        X: [],
        O: []
    }

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

    const checkWinner = (game) => {
        let isWinner = ''
        Object.keys(game).map((key, index) => {
            const player = game[key]
            if (player.length < 3) {
                return false
            }
            const result = winningCombinations.map(combination => {
                const match = player.every(position => combination.includes(position))
                return match
            });
            if (result) {
                isWinner = key
            }
        })
        return isWinner
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    );

    function Square({ squareId, onSelectedSquare, game, winner }) {

        const [player, setPlayer] = useState('')

        useEffect(() => {
            if (game === initialGame) {
                setPlayer('')
                return
            }
            getPlayer()
        }, [game])

        const onClickSquare = () => {
            if (player || winner) {
                return
            }
            onSelectedSquare(squareId)
        }

        const getPlayer = () => {
            Object.keys(game).map((key, index) => {
                const played = game[key].some(position => position === squareId)
                console.log('getPlayer', played)
                setPlayer(played ? key : "")
            })
        }

        return <div className="square" style={squareStyle} onClick={onClickSquare}>{player}</div>;
    }

    function Board() {
        const [player, setPlayer] = useState("X");
        const [winner, setWinner] = useState(false);

        const [game, setGame] = useState(initialGame)

        const resetBoard = () => {
            setWinner(false);
            setPlayer("X");
            setGame(initialGame)
        };

        const onSelectedSquare = (squareId) => {
            setGame({ ...game, [`${game[player]}`]: [...game[player], squareId] })
            setPlayer(player === "X" ? "O" : "X")
            console.log(squareId)
        }

        useEffect(() => {
            const isWinner = checkWinner(game)
            console.log({ isWinner })
            if (isWinner) {
                setWinner(isWinner)
            }
        }, [game])

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
                        <Square squareId={1} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                        <Square squareId={2} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                        <Square squareId={3} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                    </div>
                    <div className="board-row" style={rowStyle}>
                        <Square squareId={4} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                        <Square squareId={5} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                        <Square squareId={6} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                    </div>
                    <div className="board-row" style={rowStyle}>
                        <Square squareId={7} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                        <Square squareId={8} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                        <Square squareId={9} onSelectedSquare={onSelectedSquare} game={game} winner={winner} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
