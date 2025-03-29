import { useState } from "react";

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
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
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
    return r > 0.8 ? smartmove(b) : empty[Math.floor(Math.random() * empty.length)];
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
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", background: "#000", fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "15px", padding: "20px", background: "#111",
        borderRadius: "10px", boxShadow: "0px 8px 15px rgba(255, 255, 255, 0.3)"
      }}>
        <h1 style={{
          fontSize: "28px", fontWeight: "900", color: "#00ffcc",
          textTransform: "uppercase"
        }}>Tic-Tac-Toe</h1>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 100px)",
          gap: "8px", background: "#222", padding: "12px",
          borderRadius: "8px"
        }}>
          {b.map((v, i) => (
            <button key={i} onClick={() => click(i)} style={{
              width: "100px", height: "100px", fontSize: "32px", fontWeight: "900",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "4px solid #00ffcc", background: v ? "#333" : "#00ffcc",
              color: v ? "#00ffcc" : "#000", cursor: "pointer",
              transition: "0.2s"
            }}>
              {v}
            </button>
          ))}
        </div>

        <p style={{
          fontSize: "20px", fontWeight: "900", color: "#ffcc00",
          background: "#000", padding: "10px 15px", borderRadius: "5px"
        }}>
          {checkwinner(b) ? `Winner: ${checkwinner(b)}` : `Next: ${xturn ? "X" : "O (AI)"}`}
        </p>

        <button onClick={reset} style={{
          padding: "12px 25px", fontSize: "18px", fontWeight: "900",
          color: "#000", background: "#ffcc00", border: "none",
          borderRadius: "5px", cursor: "pointer", transition: "0.3s"
        }}>Reset</button>
      </div>
    </div>
  );
};

export default Tictactoe;
