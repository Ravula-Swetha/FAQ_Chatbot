let express = require('express');
let app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({credentials:true , origin:'http://localhost:3000'}));

app.use("/",async(req,res)=>{
    res.send("wellcome to KMIT");
});

app.listen(5000,()=>{console.log("backend is running at port http://localhost:5000")});

