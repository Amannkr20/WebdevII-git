// fill in javascript code here


// Select the form and the table body
const myForm = document.querySelector("form");
const tbody = document.querySelector("tbody");

myForm.addEventListener("submit", function (e) {
  // 1. Prevent the page from refreshing on form submission
  e.preventDefault();

  // 2. Capture all input values
  let name = document.getElementById("name").value;
  let doctorID = document.getElementById("docID").value;
  let specialization = document.getElementById("dept").value;
  let experience = document.getElementById("exp").value;
  let email = document.getElementById("email").value;
  let mobile = document.getElementById("mbl").value;

  // 3. Determine the Role dynamically
  let role;
  let expNum = Number(experience); // Convert string to number for comparison

  if (expNum > 5) {
    role = "Senior";
  } else if (expNum >= 2 && expNum <= 5) {
    role = "Junior";
  } else {
    role = "Trainee";
  }

  // 4. Create a new table row (tr)
  let tr = document.createElement("tr");

  // 5. Create table data cells (td) for each piece of info
  let td1 = document.createElement("td");
  td1.innerText = name;

  let td2 = document.createElement("td");
  td2.innerText = doctorID;

  let td3 = document.createElement("td");
  td3.innerText = specialization;

  let td4 = document.createElement("td");
  td4.innerText = experience;

  let td5 = document.createElement("td");
  td5.innerText = email;

  let td6 = document.createElement("td");
  td6.innerText = mobile;

  let td7 = document.createElement("td");
  td7.innerText = role;

  // 6. Create the Delete column with a button
  let td8 = document.createElement("td");
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.style.color = "white";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.border = "none";
  deleteBtn.style.padding = "5px 10px";

  // Delete functionality
  deleteBtn.addEventListener("click", function () {
    tr.remove(); // Removes the specific row when button is clicked
  });

  td8.append(deleteBtn);

  // 7. Append all cells to the row
  tr.append(td1, td2, td3, td4, td5, td6, td7, td8);

  // 8. Append the row to the table body
  tbody.append(tr);

  // 9. Reset the form after submission
  myForm.reset();
});

