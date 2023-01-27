import handler from '../../middleware/verify';
import postModel from '../../model/postModel';


handler.post(async (req, res)=>{
    const {title} = req.body.Note
    const {text} = req.body.Note

  try {
     const createpost = await postModel.create({title,text})
     res.status(200).json(createpost)
  } catch (error:any) {
    res.status(400).json(error.message)
  }
})


handler.get(async (req, res)=>{
     
  try {
     const fetchpost = await postModel.find({}).sort({createdAt: -1})
     res.status(200).json(fetchpost)
  } catch (error:any) {
    res.status(400).json(error.message)
  }
})


handler.patch(async (req, res)=>{
  const {id} = req.body
  try {
     const fetchpost = await postModel.findOne({_id:id})
     res.status(200).json(fetchpost)
  } catch (error:any) {
    res.status(400).json(error.message)
  }
})


handler.delete(async (req, res)=>{
  const {id} = req.query
  try {
     const fetchpost = await postModel.findOneAndDelete({_id:id})
     res.status(200).json(fetchpost)
  } catch (error:any) {
    res.status(400).json(error.message)
  }
})


handler.put(async (req, res)=>{
  const {id} = req.query
  const {title} = req.body.Note
  const {text} = req.body.Note
  try {
     const fetchpost = await postModel.findByIdAndUpdate({_id:id}, {
      title,text
     },{new:true})
     res.status(200).json(fetchpost)
  } catch (error:any) {
    res.status(400).json(error.message)
  }
})


export default handler