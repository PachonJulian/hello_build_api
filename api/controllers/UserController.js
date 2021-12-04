/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const UserServices = require('../services/UserServices');
module.exports = {
  

    signUp: async function(req, res){
        
        const {fullName, email, password}=req.body;

        if(!fullName || !email || !password ){
            return res.status(400).json({status: false, message: 'No Params body'})
        }
        const user={
            fullName,
            email,
            password
        }
        const saved= await UserServices.signUp(user);
        if(!saved.status){
            return res.status(400).json({status: false, message: saved.message})
        }
        return res.status(200).json({status: true,message: saved.message})

    },
    /**
     * function to control login 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    login: async function(req, res){
        const { email, password}=req.body;
        if(!email || !password ){
            return res.status(400).json({status: false, message: 'No Params body'})
        }
        const user={
            email, 
            password
        }
        const validUser=await UserServices.login(user);
        if(!validUser.status){
            return res.status(400).json({status: false, message: validUser.message})
        }
        return res.status(200).json({status: true, message: validUser.message, token: validUser.token})
    }


    
};

