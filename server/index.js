import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

import ConnectDB from "./database/connection";

import Auth from "./api/auth";

import privateRouteConfig from "./config/route.config";
import googleAuthConfig from "./config/googleOAuth.config";

dotenv.config();

const app = express();

privateRouteConfig(passport);
googleAuthConfig(passport);

app.use(express.json());
app.use(session({ secret: "process.env.SECRET_KEY" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/auth", Auth);

const PORT = 4000;

app.listen(PORT, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running!!!");
    })
    .catch((error) => {
      console.log("Server is running, but database connection failed...");
      console.log(error);
    });
});
