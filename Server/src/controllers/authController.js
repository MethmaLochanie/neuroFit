const { registerUser, loginUser} = require('../services/authService');

//register a new yser
exports.registerUser = async (req, res) => {
    try{
        const user = await registerUser(req.body);
        if(user){
            res.status(201).json({ message: 'User registered successfully'});
        }else{
            res.status(400).json({ message: 'User registration failed'});
        }
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

//login a user
exports.loginUser = async (req, res) => {
    try {
        const user = await loginUser(req.body); // Call the service layer

        res.status(200).json(user); // Send success response if login succeeds
    } catch (error) {
        // Handle specific error messages
        if (error.message === 'Invalid Email') {
            return res.status(404).json({ error: true, message: error.message });
        } else if (error.message === 'User not verified') {
            return res.status(403).json({ error: true, message: error.message });
        } else if (error.message === 'Invalid Password') {
            return res.status(401).json({ error: true, message: error.message });
        }

        // Handle unexpected errors
        res.status(500).json({ error: true, message: 'Server Error' });
    }
};

