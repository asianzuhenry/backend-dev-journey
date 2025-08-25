import _ from 'lodash'


// common functions 
const nums = [1, 2, 3, 4, 5];

// Chunk into groups
console.log(_.chunk(nums, 2)); 
// [[1,2],[3,4],[5]]

// Remove falsy values
console.log(_.compact([0, 1, false, 2, "", 3]));
// [1, 2, 3]

// Flatten nested arrays
console.log(_.flattenDeep([1, [2, [3, [4]]]]));
// [1, 2, 3, 4]

// Remove duplicates
console.log(_.uniq([1, 2, 2, 3, 4, 4]));
// [1, 2, 3, 4]



// working with objects 
const user = { name: "Henry", age: 20, location: "Uganda" };

// Pick specific keys
console.log(_.pick(user, ["name", "age"]));
// { name: "Henry", age: 20 }

// Omit specific keys
console.log(_.omit(user, ["location"]));
// { name: "Henry", age: 20 }

// Deep clone objects
const clone = _.cloneDeep(user);
console.log(clone);


// working with strings 
console.log(_.camelCase("Hello world from Lodash"));
// helloWorldFromLodash

console.log(_.kebabCase("Hello World From Lodash"));
// hello-world-from-lodash

console.log(_.capitalize("henry"));
// Henry

// utilities 
// Random number
console.log(_.random(1, 10)); 

// Debounce (limit how often a function runs)
const log = _.debounce(() => console.log("Typing..."), 1000);

// If you call log() many times quickly, it only prints once after 1 second.
