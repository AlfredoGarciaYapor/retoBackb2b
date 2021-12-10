const { User } = require('../models/users.model');

async function getUsersList(req, res){
    
    console.log('%c⧭', 'color: #0088cc', req.body);

    try {
            const userInfo = await User.find().select('name lastName email password phone city state address');
        
            if(userInfo){
                res.status(200).json({"success": true, "data": userInfo});
            }else{
                res.status(204).json({"success": true, "data": []});
            }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error in the server"});
    }
}

async function getUserInfo(req, res){
    const {userId} = req.body;
    console.log('%c⧭', 'color: #0088cc', req.body);

    try {
        if(userId){
            const userInfo = await User.findOne({"_id": userId}, 'name lastName email password phone city state address');
        
            if(userInfo){
                res.status(200).json({"success": true, "data": userInfo});
            }else{
                res.status(204).json({"success": true, "data": []});
            }
        }else{
            return res.status(400).json({ "message": "Error finding user: missing varibles.", "data": []});
        }
        
    } catch (error) {
        console.log(err);
        return res.status(400).json({ "message": "Error in the server"});
    }
}

async function getUser(req, res){
    const {email, password} = req.body;

    if(email && password){
        const userInfo = await User.findOne({"email": email, "password": password}, 'name lastName email password phone city state address');
    
        if(userInfo){
            res.status(200).json({"success": true, "data": userInfo});
        }else{
            res.status(204).json({"success": true, "data": []});
        }
    }else{
        console.log(err);
        return res.status(500).json({ "message": "Error finding user: missing varibles.", "data": []});
    }
}

async function signUpUser(req, res){
    const { name, lastName, email, password} = req.body;
    try {
        if(name && lastName && email && password){
            const newUser = await new User({
                "name": name,
                "lastName": lastName,
                "email": email,
                "password": password,
                "phone": "",
                "city": "",
                "state": "",
                "address": ""
            }).save();
    
            if(newUser){
                return res.status(200).json({"success": true, "data": newUser});
            }else{
                return res.status(204).json({"success": true, "data": []});
            }
        }else{
            return res.status(400).json({"success": true, "message": "Error BadRequest: variable(s) faltante(s)"});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error creating user.", "data": []});
    }

}

async function updateUser(req, res){
    const {userId, name, lastName, email, password, phone, city, state, address} = req.body;

    try {
        if(name && lastName && email && password && phone && city && state && address){
            const updatedUser = await User.updateOne({"_id": userId}, {
                "name": name,
                "lastName": lastName,
                "email": email,
                "password": password,
                "phone": phone,
                "city": city,
                "state": state,
                "address": address
            })
    
            if(updatedUser){
                return res.status(200).json({"success": true, "data": updatedUser});
            }else{
                return res.status(204).json({"success": true, "data": []});
            }
        }else{
            return res.status(400).json({"success": true, "message": "Error BadRequest: variable(s) faltante(s)"});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error updating user.", "data": []});
    }
}

async function removeUser(req, res){
    const{adminId, userId} = req.body;

    try {
        if(userId && adminId=="61a8ae49482015eba2a92bea"){
            const deletedUser = await User.deleteOne({"_id": userId});

            if(deletedUser){
                return res.status(200).json({"success": true, "data": userId});
            }else{
                return res.status(204).json({"success": true, "data": []});
            }
        }else{
            return res.status(400).json({"success": true, "message": "Error BadRequest: No eres admin o hay variable(s) faltante(s)"});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error deleting user.", "data": []});
    }
}

module.exports = {
    getUser,
    signUpUser,
    updateUser,
    removeUser,
    getUserInfo,
    getUsersList
}