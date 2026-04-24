// Code using vanilla JS
const app = document.createElement("h1");
app.innerText = "hello"
document.getElementById("root").append(app)

// Code using ReactJS
// const app = React.createElement(tagName,{Props and attributes},"content")
// const app = React.createElement("h1",{id:"head"},"Hello from React");


// Code using bebel library
const app = <h1 id="head">Hello world</h1>

console.log(app)
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(app)