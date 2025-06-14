//console.log(this);

// function showThis() {
//   console.log(this);
// }
// showThis();

// const person = {
//   name: "Alex",
//   greet: function () {
//     console.log(this);
//   }
// };
// person.greet();

// document.getElementById("btn").addEventListener("click", function () {
//   this.textContent = this;
// });

// let visits = 0;
// function trackVisits(){
//   visits++;
//   console.log(this); // 'this' refers to the global object (window in browsers) console.log( You have visited this page ${visits} times.');
// }
// trackVisits(); // Calls the function

// const girlfriend = {
// 	name: "Emily",
// 	takeSelfie: function(){
// 		console.log("This is " + this.name + "'s selfie");
//     // 'this' refers to the 'girlfriend' object
//   }
// }
// girlfriend.takeSelfie(); // Output: This is Emily's selfie

// var abc = 123
// console.log(abc)

// function a(...b){
// 	console.log("The input was:", b);
// }

// a("a","b","c");

// const d = ["d", "e", "f"];
// const e = [...d, "g"];
// console.log(e);

// const person = {
// 	name: "Alice",
// 	greet: function(){
// 		name :"John"
// 		setTimeout(()=> {
// 			console.log(`Hello, ${this.name}`); // 'this' refe
// 		}, 1000);
// 	}
// };

// person.greet(); // Output: Hello, Alice


const crush = {
	likes: ["Movies", "Music"],
	sayHi: function () {
		return "Hi, let's hang out!";
	},
};

// Create a friend object inheriting from crush
const friend = Object. create (crush);
friend.sharedSecrets = ["Vacation plans"];

console. log(friend.likes); // ["Movies", "Music"] (Inherited) 
console. log(friend.sayHi()); // "Hi, let's hang out!" (Inherited) 
console.log(friend.sharedSecrets); // ["Vacation plans"]