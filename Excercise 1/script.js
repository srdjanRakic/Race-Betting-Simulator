let btn = document.querySelector("#someBtn");
let display = document.querySelector("#result");

function read(obj){
    return `${obj.name} ${obj.lastName} ${obj.yearOfBirth}`;
}
function random(array){ // function that finds a random element from array
    random = Math.floor(Math.random() * array.length);
    return array[random];
}
//////////////// SECTION ONE! ///////////////////////
/*
let john = {}; // Empty object!
//let john = new Object(); //the same but longer!

john.name = "John"; // Give the object john Name
john.lastName = "Doe"; // Give the object john lastName
john.fullName = function() {
    return `${this.name} ${this.lastName}`;
}
console.log(john); // Show the object in console
console.log(john.fullName());

let jane = {
    name: "Jane",
    lastName: "Doe",
    fullName: function(){
        return `${this.name} ${this.lastName}`;
    }
}

console.log(jane); // Show the object in console
console.log(jane.fullName());

//delete.john.name -> deletes property
*/
///////////////////// SECTION TWO! //////////////////////////

// Constructor Notation
function Person(name, lastName, yearOfBirth){
    this.name = name;
    this.lastName = lastName;
    //this.age= undefined;
    this.yearOfBirth = yearOfBirth;
    this.fullName = function() {
        return `${this.name} ${this.lastName}`;
    }
}

let john = new Person("John", "Doe", "1980");
let jane = new Person("Jane", "Doe", "1990");
console.log(john);

btn.addEventListener("click", function(){
    display.innerHTML = "";
    display.innerHTML += read(john);
});