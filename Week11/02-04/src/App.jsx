import Avatar from "./Components/Avatar";
import Avt from "./Components/Avt";

function App() {

  let arr = ["a","b","c","d","e"]

  const ans = arr.map((el)=><li>{el}</li>)
  return (
    <div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <h1>Hello world</h1>
      <Avt name="manish" id={46} />
      <Avt name="sumit" id={26} />
      <Avatar />
      <hr />
    </div>
  );
}

export default App;
