const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Command queue to store actions for the emulator
let commandQueue = [];

// Endpoint to receive commands from the frontend
app.post("/api/command", (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).send({ error: "No command provided" });
  }

  console.log(`Received command: ${command}`);
  commandQueue.push(command);

  res.send({ status: "Command added to queue!" });
});

// Endpoint to get the next command for the emulator
app.get("/api/next-command", (req, res) => {
  if (commandQueue.length === 0) {
    return res.send({ command: null });
  }
  
  const nextCommand = commandQueue.shift();
  res.send({ command: nextCommand });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
