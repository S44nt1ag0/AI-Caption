const express = require("express");
import router from "./router";
import databaseSync from "./Database/Sync";
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

try {
  databaseSync();
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}

app.use(
  cors({
    origin: "https://www.captionai.lat",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
