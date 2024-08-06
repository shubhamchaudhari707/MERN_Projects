const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User({ name, email, password }).save();

    console.log(user);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendResetPassword = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      transport: "SMTP",
      service: "gmail",
      host: "smtp.gmail.com",
      secureConnection: false,
      port: 587,
      requiresAuth: true,
      domains: ["gmail.com", "googlemail.com"],
      auth: {
        user: "shubhamchaudhari707@gmail.com",
        pass: "ghwncbczqtgaikhc",
      },
    });

    const mailOptions = {
      from: "shubhamchaudhari707@gmail.com",
      to: email,
      subject: "for reset password",
      html:
        "<p>Hii " +
        name +
        ', please copy the link and <a href="http://localhost:5000/api/v1/reset-password?token=' +
        token +
        '"> reset your password </a> </p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("mail has been send", info.response);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, msg: error.message });
  }
};

exports.forgotpassword = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (user) {
      const randomString = randomstring.generate();
      const data = await User.updateOne(
        { email },
        { $set: { token: randomString } }
      );

      sendResetPassword(user.name, user.email, randomString);

      res.status(200).send({
        success: true,
        msg: "please check you inbox of mail and reset your password",
      });
    } else {
      res.status(200).send({ success: true, msg: "this mail does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.reset_password = async (req, res) => {
  try {
    const token = req.query.token;
    console.log(token);

    const tokenData = await User.findOne({ token: token });
    console.log(tokenData);

    if (tokenData) {
      const password = req.body.password;
      const userdata = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: password, token: "" } },
        { new: true }
      );
      console.log(userdata);
      res
        .status(200)
        .send({ success: true, msg: "password has been reset", userdata });
    } else {
      res.send({
        success: false,
        msg: "this link has been expred",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
