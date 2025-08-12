require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cookieParser = require("cookie-parser");

const response = require("@/middlewares/response.middleware");
const handleError = require("@/middlewares/handle-error.middleware");

const mainRouter = require("@/routes");

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(response);
app.use("/api/v1", mainRouter);
app.use(handleError);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
