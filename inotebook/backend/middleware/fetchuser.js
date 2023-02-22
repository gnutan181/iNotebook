const  jwt = require('jsonwebtoken');
const JWT_SECRET = 'harryisgoodboy'; // isse m apne webtoken ko sign krunga


    // auth token ko decode krke userid nikaleneg. jo jo request mang rhi ki user authenticate hona chiye m unne header bhej dunga authentication token ke naam ka.or header me se data nikal m yha pe fech kr lunga 

const fetchuser= (req,res,next) =>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "please authenticat a valid user"})

    } 
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error : "please authenticate a valid user"})  
        console.log(error)
        
      }
    
}
module.exports = fetchuser