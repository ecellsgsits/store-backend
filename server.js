import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {config} from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import {fileURLToPath} from "url";
import {dirname} from "path";
import {errorHandler} from "./middleware/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  config({path: __dirname + "/.env"});
} else {
  config();
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Backend running on 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/orders", orderRoutes);
app.use(errorHandler);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client", "build")));
//   app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
//   });
// }
