import Avt from "./Components/Avt";
import Avatar from "./Components/Avatar1";

function App() {
  let arr = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"];

  // 1. Added "index" and used it as a "key" prop (best practice)
  const ans = arr.map((el, index) => <li key={index}>{el}</li>);

  return (
    <div>
      <h3>Dynamic Task List:</h3>
      <ul>
        {/* 2. Instead of typing <li> manually, we use the 'ans' variable here */}
        {ans}
      </ul>

      <Avt name="John Doe" age={30} />
      <h1>Hello World</h1>
      <Avatar />
    </div>
  );
}

export default App;