const express = require('express');
const router = express.Router();
const User = require("../../models/user.model");

// const newUser = new User({
//     username: "Kartikd23",
//     password: "123456",
//     email: "123@gmail.com",
//     isTeacher: false
// })
// newUser.save().then(()=>{
//     console.log("Successfully saved user");
// }).catch((err) => {
//     console.log(err);
// })

router.get("/", (req,res) => {
    User.find({})
    .then(users => {
        res.json(users)
    })
    .catch(err => {res.status(500).json("Error: "+err)});
});

router.post("/register", (req,res) => {
    
})

router.post("/login", (req,res) => {

})

module.exports = router;