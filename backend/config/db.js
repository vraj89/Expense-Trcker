const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
          const conn= await mongoose.connect(process.env.MONGODB_URI)
          console.log('Mongo Db connected ')
    }
    catch(error){
        console.error(error.message)
    }
}

module.exports =connectDB();