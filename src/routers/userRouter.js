const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
    userSignup,
    userSignin,
    signout,
    addPhoneNumber,
    welcome,
} = require("../controllers/userController");

router.post("/signup", userSignup);

router.post("/login", userSignin);

router.get("/signout", signout);

router.get("/welcome", welcome);

router.put("/edit/phonenumber", auth, addPhoneNumber);   

module.exports = router;