const express = require("express");
const app = express();

app.get("/user/:id", (req, res) => {
  const users = {
    "1": { id: 1, name: "Alice", age:20 },
    "2": { id: 2, name: "Bob", age:20 }
  };
  const user = users[req.params.id];
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

app.get("/order/:id", (req, res) => {
  const users = {
    "1": { id: 1, orderStatus: "Pending"},
    "2": { id: 2, orderStatus: "New"  }
  };
  const user = users[req.params.id];
  if (user) res.json(user);
  else res.status(404).json({ error: "Order not found" });
});

if (require.main === module) {
  app.listen(8081, () => console.log("Provider running on port 8081"));
}

module.exports = app;