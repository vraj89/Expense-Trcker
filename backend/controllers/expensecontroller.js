const Expense=require('../models/Expense');


const getAllExpense=async(req,res)=>{
    try{
        const allresponse= await Expense.find().sort({createdAt:-1});
        res.status(200).json(allresponse);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const addExpense=async(req,res)=>{

       try{
        const {title,amount,category}=req.body;

        if(!title || !amount || !category){
            return res.status(400).json({error:"All fields required "})
        }
        const expense=await Expense.create({title,amount,category});
        res.status(201).json(expense);
    }
    catch (err) {
        // 🔥 FIX: Try-catch lagaya taaki error hone par server crash na ho
        res.status(500).json({ error: err.message });
    }
}

const deleteExpense=async(req,res)=>{

    try{
        const{id}=req.params;
        const expense= await Expense.findByIdAndDelete(id);
        if(!expense){
            return res.status(404).json({error:"id not founded"})
        }
         res.status(200).json({message:"find successfully "})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports={
    getAllExpense,
    addExpense,
    deleteExpense
};