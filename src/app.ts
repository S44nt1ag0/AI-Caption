const express = require("express");
import router from "./router";
import databaseSync from "./Database/Sync";
const app = express();

try {
  databaseSync();
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}

app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
