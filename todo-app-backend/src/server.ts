import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
