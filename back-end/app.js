const express = require("express");
const logger = require("morgan");
const http = require("http");
const cors = require("cors");
// const cookieParser = require('cookie-parser');

// Add routes
const lessonsRouter = require("./routes/lesson");
const reviewsRouter = require("./routes/review");
const subscriptionRouter = require("./routes/subscription");
const usersRouter = require("./routes/user");

const app = express();

//Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Log requests to the console.s
app.use(logger("dev"));
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

// Add routes to endpoints
app.use("/lessons", lessonsRouter);
app.use("/reviews", reviewsRouter);
app.use("/subscriptions", subscriptionRouter);
app.use("/users", usersRouter);

// Add cors

// app.use(cors());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  })
);
const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
