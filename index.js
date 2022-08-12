const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')


app.use(cors());
app.use(express.json());


//create a phone number

app.post("/phones", async (req, res) => {
    try {
        const { phone_number } = req.body
        const newPhoneNumber = await pool.query(
            "INSERT INTO phones (phone_number) VALUES ($1) RETURNING *",
            [phone_number]);

        res.json(newPhoneNumber.rows);
    } catch (err) {
        console.error(err.message)
    }

})

//get all phones numbers

app.get("/phones", async (req, res) => {
    try {
        const allPhoneNumbers = await pool.query("SELECT * FROM phones")
        res.json(allPhoneNumbers.rows);
    } catch (err) {
        console.error(err.message)
    }

})

app.listen(5000, () => {
    console.log("server is running")
});