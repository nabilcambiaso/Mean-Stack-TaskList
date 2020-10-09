//this file will handle the connection to mongoDB database

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
console.log("connected to mongoDB successfully!");
}).catch((e)=>{
    console.log("Error while tempting to connect to mongoDB database");
    console.log(e);
});

//to prevent deprecation warnings
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

//export mongoose object
module.exports={
    mongoose
}