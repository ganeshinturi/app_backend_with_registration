const mongoose = require('mongoose');

let connection=async ()=>{
    try{
       await mongoose.connect('mongodb://localhost:27017/srmdb')
       console.log('db is connected')

    }catch(error){
        console.log(error.message)

    }
}
module.exports=connection