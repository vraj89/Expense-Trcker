const express=require('express');
const router=express.Router();

const{
     getAllExpense,
    addExpense,
    deleteExpense

}=require('../controllers/expensecontroller')

router.get('/',getAllExpense)
router.post('/',addExpense)
router.delete('/:id',deleteExpense)

module.exports=router;