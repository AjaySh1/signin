const express = require("express");
const app = express();
const path = require("path");
const hbs =require("hbs");
require("./db/conn");
const Register =require("./models/registers");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));

app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/register",(req,res)=>{
res.render("register");
})
app.post("/register",async(req,res)=>{
     try{
         const password=req.body.password;
         const cpassword=req.body.confirm_password;
         if(password===cpassword)
         {
           const usr= new Register({
            username:req.body.username,
            email: req.body.email,
            password:req.body.password,
           })
           const registered=await usr.save();
           res.status(201).render("index");
         }
         else
         res.send("password are not matching");
     }
     catch(error)
     {
        res.status(400).send(error);
        res.send(req.body.username);
     }
    })

app.get("/login",(req,res)=>{
    res.render("login");
    })

    app.post("/login",async(req,res)=>{
        try{
            const email=req.body.email;
            const password=req.body.password;
        const usremail=  await  Register.findOne({email:email})
          
        if(usremail.password===password)
        {
            res.status(201).render("index");
        }
        else
        {
            res.send("invalid Credential");
        }

        }
        catch(error)
        {
           res.status(400).send("invalid credential");
          
        }
       })
   


    app.get("/login/register",(req,res)=>{
        res.render("register");
        })
        app.get("/register/login",(req,res)=>{
            res.render("login");
            })
app.listen(port, () => {
    console.log(`server is runnigg  port no ${port}`);
});