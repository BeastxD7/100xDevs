import { Client } from "pg";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const client = new Client(
  process.env.POSTGRES_URI
);

async function connectDb() {
  try {
    var temp = await client.connect();
    console.log("db connected!");
  } catch (error) {
    console.log(error);
  }
}
connectDb();

app.get("/users", async function fetchUser(req, res) {
  try {
    var users = await client.query("SELECT * FROM USERS;");
    res.json({
      users: users.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", async function InsertUser(req, res) {
  try {
    const username = req.body.username;
    const user = await client.query(`INSERT INTO USERS(NAME)VALUES('${username}');`);
    res.status(200).json({
        message:"User Inserted Succesfully!",
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
        message: "Error Inserting User.",
        error
    })
  }
});

app.listen(3000);
