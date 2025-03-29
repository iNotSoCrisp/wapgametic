import React, { useState } from "react";

const App = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "black",
      color: "white",
      fontFamily: "Arial, sans-serif",
    },
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 100px)",
      gridTemplateRows: "repeat(3, 100px)",
      gap: "5px",
      marginTop: "20px",
    },
    cell: {
      width: "100px",
      height: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      fontWeight: "bold",
      backgroundColor: "#222",
      border: "2px solid white",
      cursor: "pointer",
    },
    status: {
      fontSize: "24px",
      marginBottom: "10px",
    },
    button: {
      marginTop: "15px",
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "red",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
  };

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const checkWinner = (b) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (b[a] && b[a] === b[b] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || checkWinner(board)) return;
    const newBoard = board.slice();
    newBoard[i] = isX ? "X" : "O";
    setBoard(newBoard);
    setIsX(!isX);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
  };

  const winner = checkWinner(board);
  const isDraw = board.every(cell => cell) && !winner;

  return (
    <div style={styles.container}>
      <h1>Tic-Tac-Toe</h1>
      <div style={styles.status}>
        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next: ${isX ? "X" : "O"}`}
      </div>
      <div style={styles.board}>
        {board.map((cell, i) => (
          <div key={i} style={styles.cell} onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>
      <button style={styles.button} onClick={resetGame}>Reset</button>
    </div>
  );
};

export default App;
