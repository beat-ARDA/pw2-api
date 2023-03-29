const User = require('../models/users');
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = await User.LogInPassword(, 'BeatSociety.162');
        res.json(userId);
    } catch (error) { console.log(error) }
};