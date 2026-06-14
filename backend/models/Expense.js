
const mongoose=require('mongoose');

const Expense=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength: 50, 
        trim:true


    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        required:true,
        enum:["Food","Transport","Bills","Entertainment","other"],
        default:"Food"

    }
},
    {
  timestamps: true // <-- 3. Yahan par alag se curly bracket me likhna hai
} 
 
);


module.exports=mongoose.model('Expense',Expense)