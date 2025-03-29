import { useState } from "react";
import "./app.css";

const Tictactoe = () => {
  const [b, setb] = useState(Array(9).fill(null));
  const [xturn, setxturn] = useState(true);

  const checkwinner = (b) => {
    const w = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let v of w) {
      const [a, c, d] = v;
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return b[a];
      }
    }
    return null;
  };

  const smartmove = (b) => {
    const empty = b.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);

    for (let i of empty) {
      let t = [...b];
      t[i] = "O";
      if (checkwinner(t) === "O") return i;
    }

    for (let i of empty) {
      let t = [...b];
      t[i] = "X";
      if (checkwinner(t) === "X") return i;
    }

    if (empty.includes(4)) return 4;

    const corners = [0, 2, 6, 8].filter(i => empty.includes(i));
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

    return empty[Math.floor(Math.random() * empty.length)];
  };

  const genmove = (b) => {
    const r = Math.random() * 2;
    const empty = b.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);

    if (r > 0.8) {
      return smartmove(b);
    } else {
      return empty[Math.floor(Math.random() * empty.length)];
    }
  };

  const click = (i) => {
    if (b[i] || checkwinner(b) || !xturn) return;

    const newb = [...b];
    newb[i] = "X";
    setb(newb);

    if (checkwinner(newb)) return;

    const move = genmove(newb);
    if (move !== null) {
      newb[move] = "O";
      setb(newb);
    }

    setxturn(true);
  };

  const reset = () => {
    setb(Array(9).fill(null));
    setxturn(true);
  };

  return (
    <div className="tictactoe">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="board">
        {b.map((v, i) => (
          <button key={i} className="cell" onClick={() => click(i)}>
            {v}
          </button>
        ))}
      </div>
      {checkwinner(b) ? (
        <p className="status">Winner: {checkwinner(b)}</p>
      ) : (
        <p className="status">Next: {xturn ? "X" : "O (AI)"}</p>
      )}
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default Tictactoe;