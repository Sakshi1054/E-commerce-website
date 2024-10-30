import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

// register
const registerUser = async(req, res) => {
    const {userName, email, password} = req.body

    try {

        const checkUser = await User.findOne({email})
        if(checkUser){
            return res.json({success : false, message : 'User Already exists with same email, Please try again'})
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,
            email,
            password:hashPassword
        })

        await newUser.save()
        res.status(200).json({
            success : true,
            message : "Registration successful"
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some error occured"
        })
    }
}


// login
const loginUser = async(req,res) => {
    const {email, password} = req.body

    try {

        const checkUser = await User.findOne({email})
        if(!checkUser){
            return res.json({success : false, message : "User doesn't exists, Please register first"})
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if(!checkPasswordMatch){
            return res.json({success : false, message : "Incorrect Password! Please try again"})
        }

        const token = jwt.sign({
            id : checkUser._id,
            role : checkUser.role,
            email : checkUser.email
        }, 
        'CLIENT_SECRET_KEY',
        {
            expiresIn : '60m'
        }
    )

        res.cookie('token', token, {httpOnly: true, secure : false}).json({
            success: true,
            messege: "Logged In successfully", 
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id,
                userName: checkUser.userName
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some error occured"
        })
    }
}

const logoutUser = (req,res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logged out successfully"
    })
}

// auth middleware
const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success: false,
        message: "Unauthorised user!"
    })

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        })
    }
}


export {registerUser, loginUser, logoutUser, authMiddleware};