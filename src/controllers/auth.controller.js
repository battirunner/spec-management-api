const { cache } = require('joi');
const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');
const { error } = require('winston');

exports.signup = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}

exports.signinSessionValidate = (req, res) => {
    const { email, token } = req.body;

    const validateToken = decodeToken(token);
    // console.log("check decodeToken result", testToken);
   
    if (validateToken?.level == 'error') {
        res.status(400).send({
            status: 'error',
            error: validateToken,
            message: validateToken?.message
        });
    } else {
        res.status(200).send({
            status: 'success',
            data: validateToken,
            message: 'Valid token'
        });
    }
   
}