import "./styles.css";

function Button({ onClick, variant, children }) {
  // ternary operator
  const primaryStyle = {
    padding: "1rem",
    color: "lightcoral",
    background: "lightcyan",
  };
  const secondaryStyle = {
    padding: "1rem",
    color: "lightcyan",
    background: "lightcoral",
  };
  const style = variant === "primary" ? primaryStyle : secondaryStyle;

  return (
    <button
      style={style}
      onClick={() => {
        alert("clicked");
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className="App">
      <p>Hello </p>
      <h1>Button Examples</h1>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}
