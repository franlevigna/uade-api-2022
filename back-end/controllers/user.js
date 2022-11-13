const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const user = require('../models').user;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

exports.create =
    async function(req, res) {
       let hashedPassword;
       try {
           hashedPassword = await bcrypt.hash(req.body.password, 12);
       } catch (e) {
           console.log(e)
           return res.status(500).json({status: 500, message: "Internal Server Error"})
       }
        try {
            const createdUser = await user
                .create({
                    username: req.body.username,
                    email: req.body.email,
                    phone_number: req.body.phoneNumber,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    password: hashedPassword,
                    primary: req.body.status,
                    universitary: req.body.universitary,
                    secundary: req.body.secundary,
                    terciary: req.body.terciary,
                    birth_date: req.body.birth_date,
                    experience: req.body.experience,
                    degree: req.body.status,
                    user_type: req.body.userType,
                    created_at: new Date(),
                    updated_at: new Date(),
                })


            return res.status(200).json({status: 200, data: createdUser, message: "User created successfully"});


        } catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: e})
        }
    }

exports.login = async function(req, res) {
    const userFound = await user.findOne({
        where: {
            email: req.body.email
        }
    });


    let token;
    if (userFound) {
        const passwordValid = await bcrypt.compare(req.body.password, userFound.password);
        console.log(passwordValid);
        if (passwordValid) {
            token = jwt.sign({
                userFound,
                expiresIn: 86400
            }, process.env.SECRET);

            // Everything is correct so we print the token
            res.status(200).json({token: token});
        } else {
            res.status(400).json({error: "Password Incorrect"});
        }
    } else {
        res.status(404).json({error: "User does not exist"});
    }


}