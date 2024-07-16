const hello = "HELLO";

console.log(hello);

// ARROW FUNCTION
const add = (a: number, b: number) => {
  return a + b;
};

const sub = (a: number, b: number) => a - b;

console.log(add(1, 2));
console.log(add(3, 1));

type Person = {
  name: string;
  age: number;
  greet: () => void;
};

// OBJECTS
const person: Person = {
  name: "joe",
  age: 1000,
  greet() {
    console.log(`Hi I am ${this.name}, ${this.age} old`);
  },
};

person.greet();

// array
const hobbies = ["sports", "cooking", 1, { name: "something" }];

for (let hobby of hobbies) {
  console.log(hobby);
}

// create new array, 배열 수정할때 사용
// hobbies.map()

// spread operator
const newHobbies = ["something new", ...hobbies];
console.log(newHobbies);

// rest operator
const toArray = (...args: any) => {
  return args;
};

console.log(toArray(1, 2, 3, 4, 1, 2, 3, 4));

// destructuring
const printName = ({ name }: Person) => {
  console.log(name);
};

printName(person);
