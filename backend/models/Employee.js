const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
});
module.exports = mongoose.model('employees', employeeSchema);