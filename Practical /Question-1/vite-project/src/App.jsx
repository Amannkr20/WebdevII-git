// Context API implementation 
// Create a react app use the concept of context API  
// Requirment: Create / Provider / Consume

import React, { createContext, useContext, useState } from 'react';
const MyContext = createContext();

function App() {
  const [message, setMessage] = useState("Hello from Aman");

  return (
    <MyContext.Provider value={{ message, setMessage }}>
      <div>
        <h1>Aman's Example</h1>
        <Child />
      </div>
    </MyContext.Provider>
  );
}
function Child() {
  return (
    <div>
      <h2>Bhavya</h2>
      <GrandChild />
    </div>
  );
}
function GrandChild() {
  const { message, setMessage } = useContext(MyContext);

  return (
    <div>
      <h3>GrandChild Component</h3>
      <p>{message}</p>
      <button onClick={() => setMessage("Updated from Bhavya")}>
        Update Message
      </button>
    </div>
  );
}

export default App;