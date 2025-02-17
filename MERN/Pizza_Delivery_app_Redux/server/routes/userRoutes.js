const express = require('express')
const router = express.Router();
const User = require('../models/userModels')


//register
router.post('/register', (req, res)=>{
    try {
        const {name, email, password} = req.body;

        const newUser = new User({name, email, password}).save()
        console.log(newUser)

        res.status(201).json({
            success:true,
            message:"Register Success",
            newUser
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:error
        })
    }
})


//login user
router.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.find({email, password})
        
        if (user.length > 0) {
            const currentUser = {
                name:user[0].name,
                email:user[0].email,
                isAdmin:user[0].isAdmin,
                _id: user[0]._id,
            }
            console.log(currentUser)
            res.status(200).send(currentUser)

        }
        else{
            res.status(400).json({
                message:'login fail'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json({
            message:"something went wrong"
        })
    }
})  


router.get("/getallusers", async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(404).json({ message: error.stack });
    }
});
  

router.post("/deleteuser", async (req, res) => {
    const userid = req.body.userid;
    try {
      await User.findOneAndDelete({ _id: userid });
      res.status(200).send("User Deleted");
    } catch (error) {
      res.status(404).json({ message: error.stack });
    }
});


module.exports = router;
