const User = require('../models/users');

exports.LogInPassword = async (req, res) => {
    const userId = await User.LogInPassword('alvaro.duronalj@uanl.edu.mx', 'BeatSociety.162');
    console.log(userId);
};