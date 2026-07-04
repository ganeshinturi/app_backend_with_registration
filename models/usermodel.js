let mongoose=require('mongoose')
let userschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true,min:8},
    email:{type:String,required:true,unique:true}
},{timestamps:true})
module.exports=mongoose.model('users',userschema)
