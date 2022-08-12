const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(cors());
app.use(express.json());


if(process.env.NODE_ENV === "production"){
   app.use(express.static(path.join(__dirname,"client/build")));     
}


// @desc    create phone number
// @route   /phones POST
// @access  Public

app.post("/phones", async (req, res) => {
    try{
        const { code, phone_number } = req.body;
       
        const newPhoneNumber = await pool.query(
            "INSERT INTO phones (phone_number,code) VALUES ($1, $2) RETURNING *",
            [phone_number, code]);

        res.status(201).json(newPhoneNumber.rows);
    }catch (err) {
        console.error(err.message);
    }
})

// @desc    get all phone numbers
// @route   /phones GET
// @access  Public

app.get("/phones", async (req, res) => {
    try {
        const allPhoneNumbers = await pool.query("SELECT * FROM phones");
        res.status(200).json(allPhoneNumbers.rows);
    } catch (err) {
        console.error(err.message);
    }

})

app.listen(PORT, () => {
    console.log("server is running");
});