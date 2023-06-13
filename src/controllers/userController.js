const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userSignin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        User.findOne({ email: email }, async (err, user) => {
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = await user.generateAuthToken();
                    res.cookie("jwt", token, { httpOnly: true, SameSite: false });
                    res.send({
                        success: true,
                        message: "hewwo"
                    }).status(201);

                } else {
                    res.send({ message: "Invalid credentials" }).status(401);

                }
            } else {
                res.send({ message: "User not found" }).status(401);

            }
        })
    } catch (error) {
        res.send(error).status(404);

    }
})

const userSignup = asyncHandler(async (req, res) => {
    const { name, email, password, phone_number } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter Mandatory fields")
    }
    try {
        User.findOne({ email: email }, async (err, user) => {
            if (user) {
                res.send({ message: "User already regestered" });
            } else {
                try {
                    const user = new User({ name, email, password, phone_number });
                    const token = await user.generateAuthToken();

                    res.cookie("jwt", token, { httpOnly: true, SameSite: false });
                    const createUser = await user.save();
                    res.send({ success: true, message: "Signed up successfull" }).status(200);

                } catch (error) {
                    console.log(error);
                }
            }
        })
    } catch (error) {
        console.log(error);
    }

})

const signout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("jwt");

        //logout only from single device
        req.user.tokens = req.user.tokens.filter((currElm) => {
            return currElm.token !== req.token;
        })

        await req.user.save();
        res.send({ message: "logedout" }).status(200);
    } catch (error) {
        res.status(500).send(error);
    }
})

const addPhoneNumber = asyncHandler(async (req, res) => {
    const { phone_number } = req.body;
    const user = req.user;
    try {
        const updateProfile = await User.findByIdAndUpdate(user._id, {
            phone_number: phone_number
        }, {
            new: true
        })
        res.send({
            success: true,
            message: "Phone number changed / added successfully"
        }
        ).status(201);
    } catch (error) {
        res.send(error).status(404);
    }
})

const welcome = asyncHandler(async (req, res) => {
    const content = {
        success: true,
        message: "API successfully called"
    }
    res.send(content).status(200);
})

module.exports = {
    userSignup,
    userSignin,
    signout,
    addPhoneNumber,
    welcome
}