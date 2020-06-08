const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("App listening on PORT " + PORT);
});
