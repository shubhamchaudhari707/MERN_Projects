const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const secreatKey = "secreatKey";
// app.use(express.json());

app.get("/", (req, res) => {
  res.send("token tutorials");
});

const user = {
  _id: "645b1faf6adb0dab1fc4b501",
  username: "shubham",
  email: "abc@gmail.com",
};

app.post("/login", async (req, res) => {
  try {
    const token = jwt.sign({ _id: user._id }, secreatKey, { expiresIn: "1h" });
    console.log(token);
    res.send({ token });

    // jwt verify
    // const decode = jwt.verify(token, secreatKey)
    // console.log(decode)
  } catch (error) {
    console.log(error);
  }
});

// middileware
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } 
  else {
    res.send({
      result: "Token is not valid",
    });
  }
};

app.post("/profile", verifyToken, (req, res) => {
  try {
    const authData = jwt.verify(req.token, secreatKey);
    res.send(authData);
  } catch (error) {
    console.log(error);
  }
}); 

app.listen(5000, () => {
  console.log("server is running");
});
