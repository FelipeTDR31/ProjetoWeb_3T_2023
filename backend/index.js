import router from "./routes/index.js";
import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();

app.use(cors())

app.use(express.json())
app.use(session({
    name: "session-default",
    secret: "something_really_dumb",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60 * 24
    }
}))
app.li
app.use(router)
sten(4000, () => {
    console.log("Listening on port 4000")
})