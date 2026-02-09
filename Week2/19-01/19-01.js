// // Callback And Higher Order Functions
// function HOF(callback){
//     console.log("1");
//     callback();
//     console.log("2");

// }

// function greet(){
//     console.log("3");
// }

// HOF(greet); 


// //Arry Higher Order Functions Methods

// // a) map()

// let arr = [1,2,3,4,5];


// // arr.map((el,i,arr)=>{
// //     console.log(el,i,arr);
// // })



// // let ans = arr.map((el)=>{
// //     return el+5;
// // })



// // console.log(ans);


// // b) filter()

// let arr1 = [10,15,20,25,30,35];


// let arr = [1,2,3,4,5]

// let ans = arr.reduce((acc,el)=>{
//     return acc+el;
// },0)

// console.log(ans);



// let ans1 ="hello world";
// let ans2 = ans1.split(" ").reverse().join(" ").split("").reverse().join("");
// console.log(ans2); 

let str ="hello world";
let ans2 = str.split("").reverse().join("");
console.log(ans2); 
