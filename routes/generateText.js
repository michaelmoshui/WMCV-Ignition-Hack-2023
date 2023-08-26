const express = require("express");
const { useChat } = require("../controllers/chat");

const router = express.Router();

// add new RESTFUL API here as such, with url and function
router.post("/useChat", useChat);

module.exports = router;
