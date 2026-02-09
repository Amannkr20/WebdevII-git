// step -1 select form

// let todoArr;

let todoArr = JSON.parse(localStorage.getItem("todo")) || [];
let favArr = JSON.parse(localStorage.getItem("fav")) || [];

document.querySelector("form").addEventListener("submit", getData);
displayTable(todoArr);

// if(JSON.parse(localStorage.getItem("todo"))==null){
//   todoArr = []
// } else{
//   todoArr = JSON.parse(localStorage.getItem("todo"))
// }

// step -2 Get the data from form

function getData(e) {
  e.preventDefault();
  const taskName = document.querySelector("#task").value;
  const taskPriority = document.querySelector("#priority").value;

  //   console.log(taskName, taskPriority);

  //   let taskObj = {
  //     taskName:taskName,
  //     taskPriority:taskPriority
  //   }

  let taskObj = {
    taskName,
    taskPriority,
  };

  todoArr.push(taskObj);

  localStorage.setItem("todo", JSON.stringify(todoArr));
  console.log(todoArr);

  displayTable(todoArr); // [{},{},{}]
}
//   <tr>
//       <td>aa</td>
//       <td>High</td>
//       <td>Add</td>
//      </tr>

function displayTable(arr) {
  document.querySelector("tbody").innerText = "";
  arr.forEach((el) => {
    let row = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = el.taskName;

    let td2 = document.createElement("td");
    td2.innerText = el.taskPriority;

    if (td2.innerText == "High") {
      td2.style.color = "red";
    } else {
      td2.style.color = "green";
    }

    let td3 = document.createElement("button");
    td3.innerText = "add";

    td3.addEventListener("click", function () {
      favArr.push(el);
      localStorage.setItem("fav", JSON.stringify(favArr));
      alert("Todo added to Fav");
    });

    row.append(td1, td2, td3);

    document.querySelector("tbody").append(row);
  });
}
