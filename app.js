const express = require("express");
require("express-async-errors");
require("dotenv").config();
const connectDB = require("./db/connect");
const app = express();
const portfolioRouter = require("./routes/portfolio");
const notFoundMiddleware = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const { startSession } = require("./models/home");

//extra security
app.use(express.json({ limit: "50mb" }));
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

//middlewares
app.use(express.json());
app.use("/api/v1", portfolioRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};
start();
