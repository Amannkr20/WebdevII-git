import './App.css'; 
import Greet from './Components/Greet';

function  App() {
  return (
    <div className="App">
      <h1 style={{color:"blue"}}>Hello World</h1>
      <p className="text-center bg-red-700 text-white-500">TEXT CENTER</p>
      <hr />
      <Greet />

      <div className='Flex justify-content mb-10p text-black text-center'>
        <h2>1</h2>
        <h2>2</h2>
        <h2>3</h2>
        <h2>4</h2>
        <h2>5</h2>
        <h2>6</h2>
      </div>
      <div class="grid grid-cols-3 gap-4 text-center text-white bg-green-500 p-4 m-4 text-2xl font-bold border-2 border-black rounded-lg ">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
  <div>07</div>
  <div>08</div>
  <div>09</div>
</div>
<div class="grid grid-cols-3 gap-4 text-center text-white bg-green-500 p-4 m-4 text-2xl font-bold border-2 border-black rounded-lg ">
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 1</div>
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 2</div>
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 3</div>
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 4</div>
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 5</div>
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 6</div>
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 7</div>
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 8</div>
  <div class="bg-blue-500 p-8 text-white rounded border-2 border-black rounded-lg">Box 9</div>
</div>


    </div>
  );
}
export default App