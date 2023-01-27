import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import userModel from '../../model/userModel'
import bcrypt from "bcryptjs"


const generateToken = (id:string)=> {
    return jwt.sign({id}, process.env.JWT_SECRET!,{expiresIn:"1d"})
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {    

    if(req.method === "POST"){
      const {username} = req.body.userData
      const {password} = req.body.userData
      
      try {
          const user = await userModel.findOne({username})

          if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
             _id: user._id,
             username: user.username,
             token: generateToken(user._id)
            })
        }else{
            res.status(400).json("invalid credentials")
        }
      } catch (error:any) {
          res.status(400).json(error.message)          
      }
    }
}