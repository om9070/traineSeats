const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://omprakash:op12345@cluster0.xxnt5.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connection succes")
}).catch((e)=>{
    console.log(`something error${e}`);
})



