const {addToCart} = require('../services/addToCartService');


exports.addToCart = async (req, res) => {
    try{
        const addToCartItem = await addToCart(req.body);
        if(addToCartItem){
            res.status(201).json({ message: 'addToCart registered successfully'});
        }else{
            res.status(400).json({ message: 'addToCart registration failed'});
        }
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}