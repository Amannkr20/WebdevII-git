// step-1 catch/select the form tag and attach event 
document.querySelector("form").addEventListener("submit",getData );
 function getData(e){
    e.preventDefault(); 


    let taskName = document.querySelector("#task").value;
    let taskPriority = document.querySelector("#priority").value;

    console.log(taskName,taskPriority);

    let taskObj = {
        taskName,
        taskPriority,
    };
    console.log(taskObj);
    displayTask(taskObj);
 }

 function displayTask(taskObj){

 const row = document.createElement("tr");

 const td1 = document.createElement("td");
 td1.innerText = taskObj.taskName;

 const td2 = document.createElement("td");  
    td2.innerText = taskObj.taskPriority;

    const td3 = document.createElement("td");
    td3.innerText = "Add";

    row.append(td1,td2,td3);
    

    document.querySelector("tbody").appendChild(row);

 }

