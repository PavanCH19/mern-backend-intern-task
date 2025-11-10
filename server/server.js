const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/docs/swagger");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/v1/auth.routes");
const taskRoutes = require("./src/routes/v1/task.routes");
const errorHandler = require("./src/middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_, res) => res.send("✅ Backend with MongoDB is running"));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
