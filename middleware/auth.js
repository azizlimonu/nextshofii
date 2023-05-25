// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";

/* eslint-disable */
export default async (req, res) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (token) {
    //signed in
    req.user = token.sub;
    next();
  } else {
    res.status(401).json({ message: "Not signed in" });
  }
  res.end;
}