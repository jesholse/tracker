import findUser from "./functions.js";

const search = (query) => {
  findUser(query);
};

let button = document.getElementById("search");

let input = document.getElementById("battlesFound");

button.addEventListener("click", async () => {
  let query = document.getElementById("user").value;
  search(query);
});
