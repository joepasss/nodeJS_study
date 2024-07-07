const adjectives = ["Brave", "Clever", "Mighty", "Swift", "Quiet"];
const animals = ["Tiger", "Elephant", "Hawk", "Panda", "Dolphin"];

const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const generateRandomUsername = () => {
  const adjective = getRandomElement(adjectives);
  const animal = getRandomElement(animals);
  return `${adjective}${animal}`;
};

export default generateRandomUsername;
