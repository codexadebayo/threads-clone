import jwt from 'jsonwebtoken'



const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"})

    res.cookie("jwtToken", token,{
        httpOnly: true, //prevents cookie from being accessed by the browser; making it more secure
        maxAge: 15*24*60*60*1000, //15 days
        sameSite: "strict" //protect CSRF attacks
        })
        return token;

}


export default generateTokenAndSetCookie