const catchAsycError = require("../middileware/catchAsycError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsycError(async (req, res, next) => {
    
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  console.log(myPayment)

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});


exports.sendStripeApiKey = catchAsycError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: "pk_test_51NsNMASHPWJ5ZKGQbg97HI26uyp9FIf8o3XQtsETEwtss64OcvQMNiDpPfsr2A6GFC9oVBuGRrnpFJunDkTEipA800Hsv6Qg7q" });
});