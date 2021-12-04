
const jwt = require('jsonwebtoken');
module.exports = {


    signUp: async function (user) {

        const storage = require('node-persist');

        listUsers = JSON.parse(await storage.getItem('users'));

        const existUser = listUsers.filter(x => {
            return x.email == user.email;
        });

        if (existUser && existUser.length > 0) {
            return { status: false, message: 'User already exist' }
        }

        listUsers.push({
            fullName: user.fullName,
            email: user.email,
            password: user.password
        });

        await storage.setItem('users', JSON.stringify(listUsers))
        return { status: true, message: 'User register' };
    },

    login: async function (user) {
        const storage = require('node-persist');

        listUsers = JSON.parse(await storage.getItem('users'));

        const existUser = listUsers.filter(x => {
            return x.email == user.email && x.password == user.password;
        });

        if (!existUser || existUser.length == 0) {
            return { status: false, message: 'User not found' };
        }
        const token =await this.createSessionToken(user);
        return { status: true, message: 'Log In Success', token: token }
    },

    createSessionToken: async function (user) {
        let ENV_CONFIG = process.env.ENV_CONFIG || 'dev';

        const dotenv = require('dotenv').config({
            path: `.env.${ENV_CONFIG}`
        });
        const JWT_SECRET = process.env.JWT_SECRET;
       
        const token= await jwt.sign(user, JWT_SECRET, {expiresIn: '5h'});

        return token;

    },

    validateToken: async function(token){
        let ENV_CONFIG = process.env.ENV_CONFIG || 'dev';

        const dotenv = require('dotenv').config({
            path: `.env.${ENV_CONFIG}`
        });
        const JWT_SECRET = process.env.JWT_SECRET;

        try{
			const decoded = await jwt.verify(token, JWT_SECRET);
			return decoded;
		}catch(err){
			return undefined;
		}
        
    }
}