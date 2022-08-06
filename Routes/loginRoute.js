const express = require("express");
const router = express.Router();


router.get("/login", async(req, res) =>{
    try {
        const admin = await users.find({});
        res.send(admin);
    } catch (error) {
        return res.status(400).json({message : error});
    }
});