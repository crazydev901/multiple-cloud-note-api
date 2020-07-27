// import stripePackage from "stripe";
import handler from "@/libs/handler-lib";
import { calculateCost } from "@/libs/billing-lib";

export const main = handler(async (event) => {
  const { storage } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  // const description = "Scratch charge";

  // Load our secret key from the  environment variables
  // const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

  // await stripe.charges.create({
  //   source,
  //   amount,
  //   description,
  //   currency: "usd",
  // });

  return { status: true, amount };
});
