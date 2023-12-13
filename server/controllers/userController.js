const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    const secret = process.env.JWT_SECRET

    return jwt.sign({ _id, }, secret, {
        expiresIn: "3d"
    })
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).json("User already exists")
        }

        if (!(name || email || password)) {
            return res.status(400).json("All fields are required")
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json("Email is not valid")
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json("Password must contains capital letter, symbol, digit")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new userModel({ name, email, password: hashedPassword })

        await user.save()

        const token = createToken(user._id)

        res.status(201).json({ _id: user.id, name, email, token })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json("Invalid email or password")
        } 

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json("Invalid email or password")
        }

        const token = createToken(user._id)

        res.json({ _id: user._id, email, token })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId

    try {
        const user = await userModel.findById(userId).select("-password")

        res.json(user)
    } catch {
        console.log(error)
        res.status(500).json(error)
    }
}

const getUsers = async (req, res) => {
    try {
        const user = await userModel.find().select("-password")

        res.json(user)
    } catch {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    registerUser,
    findUser,
    getUsers,
    loginUser,
}
