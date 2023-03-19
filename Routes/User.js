const express = require("express");
const router = express.Router();
const bcrypt= require('bcrypt')
const nodemailer=require('nodemailer')
const User = require("../Models/userSchema");
const jwt=require("jsonwebtoken");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get a specific user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});


router.post('/register', async (req, res) => {
  try {
    // Extract user details from request body
    const { name, email, password } = req.body;

    // Hash the user password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// User login route
// router.post('/login', async (req, res) => {
//   try {
//     // Extract user details from request body
//     const { email, password } = req.body;

//     // Find the user with the specified email in the database
//     const user = await User.findOne({ email });

//     // If user not found, return an error
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare the password entered by the user with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);

//     // If passwords don't match, return an error
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate a JWT token with user id as payload
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//     // Send the JWT token as response
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



 router.post("/login", async (req, res) => {
   const { email, password } = req.body;
   try {
     const user = await User.findOne({ email});
     const isValidPassword = await bcrypt.compare(password, user.password);
    
     if (user.length > 0 && isValidPassword) {
       const currentUser = {
         name: user[0].name,
         email: user[0].email,
         isAdmin: user[0].isAdmin,
         _id: user[0]._id,
       };
       res.status(400).json({currentUser});
     }
   } catch (error) {
     
     res.status(201).json({error:error.message});
   }

 });

// Update a user
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
