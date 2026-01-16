// ES6 concepts
// 4. ternaary operator

// syntax
// condition ? expr1 : expr2    
const ans=!true ? 'yes' : 'no';// !true means not true = false to ye false ayega aur no return karega
console.log(ans); // no

// 5.nullish coalescing operator(??)
// a?? b  => if a is null or undefined, return b else return a
let ans1 = null ?? 'user';// left wali value jab null or undefined hogi tab right wali value return karega
let ans2 = false ?? 'admin';// left wali value false hai jo null or undefined nahi hai to left wali value return karega
console.log(ans1); // user
console.log(ans2); // false
let ams = undefined ?? 'null';
console.log(ams); // null

// 7. array add and remove operations
let arr = [1,2,3,4,5];// create an array 

arr.push(6);// add element at last
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]   

arr.pop();// remove element from last
console.log(arr); // [ 1, 2, 3, 4, 5 ]

arr.unshift(0);  // add element at first           
console.log(arr); // [ 0, 1, 2, 3, 4, 5 ]

arr.shift();// remove element from first
console.log(arr); // [ 1, 2, 3, 4, 5 ]

arr.splice(2,0,2.5);  // (index, deleteCount, item1, item2, ...) // add element at specific index //(index, deleteCount, item)
console.log(arr); // [ 1, 2, 2.5, 3, 4, 5 ]

// 8. array indexOf() method
let index = arr.indexOf(3);
console.log(index); // 3
let index1 = arr.indexOf(10);
console.log(index1); // -1

// rest and spread operator


// spread operator
let arr1 =[1,2,3];
let arr2 =[3,4,5];
let ans4 = [...arr1, ...arr2]; // can also add new elements like let ans = [...arr1, ...arr2,10,20];
console.log(ans4); // [ 1, 2, 3, 3, 4, 5 ]

let o1 ={a:1};
let o2 ={b:2};
let o3 = {...o1, ...o2,b:3,c:4}; // can also add new elements like let ans = {...o1, ...o2, b:3, c:4};
console.log(o3); // { a: 1, b: 3, c: 4 }

// rest operator- always return array
function add (a,b){ // jab fuction ko declare krte hai ya define krte hai vo parameter hota hai(parameter hamesha fixed hote hai ) aur jo function ko call krte hai usko argument vo hai
        console.log(a);
        console.log(b);
    }
add(1,2)
add(1) // a=1 , b=undefined kyuki b ke liye humne kuch assign nahi kiya hai 
add(1,2,3) // a=1 , b=2 , 3 is ignored kyuki function me sirf 2 parameters hai aur 3 ke liye koi vaiable assign nahi kiya hai


function add (a,...b){
        console.log(a);
        console.log(b);
    }
    add(1,2) // isme vo 2 ko b ke array me store kar dega
add(1) // isme b ke liye kuch assign nahi kiya hai to vo empty array dega
add(1,2,3) // isme vo 2,3 ko b ke array me store kar dega
// string touppercase and lowercase
let str = 'Hello World';
console.log(str.toUpperCase()); // HELLO WORLD
console.log(str.toLowerCase()); // hello world  


//  12. template literals(backtick ``)
 let name  = 'priyanshu pandey';

 console.log('my name is ' +name); // old way
 console.log(`my name is ${name}`); // new way using template literals

//  11. reverse(), join() and split() methods of array and string
let arr3 = [1,2,3,4,5];
arr3.reverse();
console.log(arr3); // [ 5, 4, 3, 2, 1 ]
