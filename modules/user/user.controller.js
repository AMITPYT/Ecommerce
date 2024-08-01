const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Amitisagoodb$oy'; // Consider using environment variables for secrets
const bcrypt = require('bcryptjs');
const sendEmail = require('../../utils/sendEmail');

const registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            role,
            password: hashedPassword,
        });

        if (user) {
            const data = {
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            };
            const authtoken = jwt.sign(data, process.env.JWT_SECRET,{ expiresIn: '30d'});
            await sendEmail(
                user.email,
                'Welcome to Our E-commerce Platform',
                `Hello ${user.email}, welcome to our platform!`
            );


            res.json({
                msg: "Registration successful",
                authtoken
            });
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.json({ msg: "Incorrect email", status: false });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ msg: "Incorrect password", status: false });

        const data = {
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        };
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);

        res.json({
            msg: "Logged in successfully",
            authtoken
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
  
    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
