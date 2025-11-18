mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        const mongoDbString=process.env.MONGODB_URI;
mongoose
  .connect(mongoDbString)
  .then(() => console.log("DataBase is connected successfully"))
  .catch(() => console.log("failed to connect to DB"));
    }catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports=connectDB;
