console.log("Hello, Node.js")


// 
import { sum, myObject, greetUser } from "./modules-demo.js"

var x = sum(2, 6)

console.log(x);
console.log(myObject);
console.log(greetUser(myObject.name));
