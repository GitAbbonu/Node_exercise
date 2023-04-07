// Create a script that uses module.exports to export a function.

function fun() {
  console.log("export");
}

module.exports = {
  fun: fun,
};
