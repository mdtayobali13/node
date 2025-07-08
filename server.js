const app = require("./index")

const port = 3000;

app.listen(port , (err)=>{
    if(err){
        console.log("Server is Error");
    }else{
        console.log("Server Running......")
    }
})