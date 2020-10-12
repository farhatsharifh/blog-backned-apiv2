import db from './../models';

const userController = {};

userController.signup = (req, res) => {
    const {username, password} = req.body;

    // validation
    const user = new db.User({
        username,
        password
    });

    user.save().then((newUser) => {
        res.status(200).json({
            success: true,
            data: newUser,
            token: 'dummy-jwt-token'
        });
    }).catch((err) => {
        res.status(500).json({
            message: err,
        });
    });
};

userController.authenticate = (req, res) => {
    const userData = req.body;

    db.User.findOne({'username': userData.username, 'password': userData.password})  
    .then((user) => {
        // if (user) {
            return res.status(200).json({
                success: true,
                data: user,
                token: 'dummy-jwt-token'
            });
        // }
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    });

};

export default userController;