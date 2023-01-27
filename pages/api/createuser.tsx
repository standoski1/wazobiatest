import type { NextApiRequest, NextApiResponse } from 'next'
import userModel from '../../model/userModel'
import { mongoConnect } from '../../utils/dbConnect'



export default async function Create(req: NextApiRequest, res: NextApiResponse) {   
      mongoConnect()
      const {password} = req.body.userData
      const {username} = req.body.userData
      const {email} = req.body.userData
      
      try {
          await userModel.create({
            username,
            password,
            email
          })
          // @ts-ignore
          res.status(200).json("success")
      } catch (error:any) {
          res.status(400).json(error)
      }
}