const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });

            const { name, email, password, role } = req.body;
            const existing = await User.findOne({ email });
            if (existing) return res.status(409).json({ message: "Email in use" });

            const hashed = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashed,
                role: role === "admin" ? "admin" : "user",
            });

            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } catch (err) {
            next(err);
        }
    }
];

const login = [
    body("email").isEmail(),
    body("password").notEmpty(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });

            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: "Invalid credentials" });

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(401).json({ message: "Invalid credentials" });

            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
        } catch (err) {
            next(err);
        }
    }
];

module.exports = {
    register,
    login
};