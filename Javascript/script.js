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

let visits = 0;
function trackVisits(){
  visits++;
  console.log(this); // 'this' refers to the global object (window in browsers) console.log( You have visited this page ${visits} times.');
}
trackVisits(); // Calls the function