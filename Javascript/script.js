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


// const crush = {
// 	likes: ["Movies", "Music"],
// 	sayHi: function () {
// 		return "Hi, let's hang out!";
// 	},
// };
// // Create a friend object inheriting from crush
// const friend = Object. create (crush);
// friend.sharedSecrets = ["Vacation plans"];

// console. log(friend.likes); // ["Movies", "Music"] (Inherited) 
// console. log(friend.sayHi()); // "Hi, let's hang out!" (Inherited) 
// console.log(friend.sharedSecrets); // ["Vacation plans"]


// function Person (name, role){
// 	this.name = name;
// 	this.role = role;
// }

// // Add methods to the prototype
// Person. prototype.greet = function (){
// 	return `Hi, I'm ${this.name}, and I am a ${this.role}.`;
// };

// const john = new Person ("John", "Husband");
// const emily = new Person ("Emily", "Wife");

// console.log(john.greet()); // "Hi, I'm John, and I am a Husband." 
// console.log(emily.greet()); // "Hi, I'm Emily, and I am a Wife."



// class Family {
// 	constructor (lastName){
// 		this. lastName = lastName;
// 	}
// 	familyTradition(){
// 		return "Sunday dinners";
// 	}
// }
// class Couple extends Family {
// 	constructor(lastName, partnerName){
// 		super (lastName) ;
// 		this. partnerName = partnerName;
// 	}
	
// 	familyTradition () {
// 		return '${this-partnerName} loves hosting Sunday dinners.';
// 	}
// }

// const couple = new Couple("Smith", "Emily");
// console. log (couple.lastName); // "Smith" console.log(couple.familyTradition()); // "Emily loves hosting Sunday



// console.log("Start");

// setTimeout(() => {
//   console.log("Async task");
// }, 0);

// console.log("End");


// async function doStuff() {
//   console.log("Before fetch");
//   // Start async fetch — this pauses doStuff here
//   await fetch("https://example.com");
//   // This runs later, after fetch resolves
//   console.log("After fetch");
// }

// doStuff();

// // Meanwhile, JS can do other things, like this:
// setTimeout(() => {
//   console.log("Timeout ran while waiting for fetch");
// }, 0);
// setTimeout(() => {
//   console.log("Timeout 2 ran while waiting for fetch");
// }, 100);
// setTimeout(() => {
//   console.log("Timeout 3 ran while waiting for fetch");
// }, 6000);
// setTimeout(() => {
//   console.log("Timeout 4 ran while waiting for fetch");
// }, 200);



function fetchCrushMessage (callback){
	let i = 0;
	const id = setInterval(() => {
		callback("Crush replied: Hi!");
		i++
		if(i==1)	clearInterval(id);
	}, 2000);
}

console.log ("Waiting for crush's reply..."); 
fetchCrushMessage ((message) => {
	console. log (message);
});