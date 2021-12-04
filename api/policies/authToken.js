const UserServices = require("../services/UserServices");

module.exports = async function (req, res, next) {
    const storage = require('node-persist');
    let token;
    //----------------------------------------------------------------------------
    if (req.headers && req.headers.authorization) {
        let parts = req.headers.authorization.split('.');
        if (parts.length == 3) {
            token = req.headers.authorization;
        } else {
            return res.status(401).json({ status: false, message: 'auth.policy.wrongFormat' });
        }
    } else if (req.param('token')) {
        token = req.param('token');
        delete req.query.token;
    } else {
        return res.status(401).json({ status: false, message: 'auth.policy.noAuthorizationHeaderFound' });
    }
    //----------------------------------------------------------------------------
    try {
        const decodedToken =await UserServices.validateToken(token);
        if (!decodedToken) {
            return res.status(401).json({ status: false, message: 'auth.policy.invalidToken' })
        }
    
        const listUsers = JSON.parse(await storage.getItem('users'));
    
        const existUser = listUsers.filter(x => {
            return x.email == decodedToken.email;
        });
    
        if(!existUser || existUser.length==0){
            return res.status(401).json({ status: false, message: 'auth.policy.unauthorized' });
        }
        //----------------------------------------------------------------------------
        next();
    
    } catch (error) {
         console.error(error);
        return next(error)
    }
};