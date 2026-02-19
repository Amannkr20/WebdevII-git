//  console.log("Start");

// function myfunction() {
//     setTimeout(() =>{
//         console.log("Function ran !!!")
//         }, 2000)
//     }
// myfunction();
// console.log("End");


console.log("Start");
function myfunction(callback) {
    setTimeout(() => {
      callback("Function ran !!!");
    }, 2000);
    }
    myfunction((data) => {
    console.log(data);
    }
    );
    console.log("End");
        