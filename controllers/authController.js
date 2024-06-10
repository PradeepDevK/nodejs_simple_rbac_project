const passport = require('passport');
const Role = require('../models/role');
const User = require('../models/user');

exports.registerUser = (req, res, next) => {
    const { username, password, role  } = req.body;
    const user = new User({ username, role});

    User.register(user, password, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        } else {
            req.login(user, (loginError) => {
                if (loginError) {
                    console.log(loginError);
                    return res.status(500).json({ error: loginError.message });
                } else {
                    return res.status(200).json({ message: 'User registered successfully' });
                }
            });
        }
    });
}


// Login a user and create a session
exports.loginUser = (req, res, next) => {
    return res.json({
        session: req.session,
        user: req.user
    })
};

exports.showAll = async (req, res, next) => {
    const users = await User.find({}, { username: 1, role: 1 });
    return res.json(users);
}