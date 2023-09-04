import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
  host:"localhost",
  user:"root",
   password:"",
    database:"signu"
})

app.post('/signup',(req,res)=>{
    const sql="INSERT INTO logi(name,email,password) VALUES(?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login',(req,res)=>{
    const sql="SELECT * FROM logi WHERE email=? AND password=?";
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("Success");
        }else{
          return res.json("Fail");
        }
    })
})










app.get('/',(req,res)=>{
    const sql="SELECT * FROM student";
    db.query(sql,(err,result)=>{
       if(err) return res.json({Message:"Error inside server"});
       return res.json(result);
    })
})



app.post('/student',(req,res)=>{
    const sql="INSERT INTO student (`company`,`description`)VALUES (?)";
    const value=[
        req.body.company,
        req.body.description
    ]
    db.query(sql,[value],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})


app.get('/read/:id',(req,res)=>{
    const sql="SELECT * FROM student WHERE ID=?";
    const id=req.params.id;

    db.query(sql,[id],(err,result)=>{
       if(err) return res.json({Message:"Error inside server"});
       return res.json(result);
    })
})

app.put('/update/:id',(req,res)=>{
    const sql='UPDATE student SET `company`=?, `description`=? WHERE ID=?';
    const id=req.params.id;
    db.query(sql,[req.body.company,req.body.description,id],(err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})
app.delete('/delete/:id',(req,res)=>{
    const sql="DELETE FROM student WHERE id=?";
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})


app.listen(8081,()=>{
    console.log("Listening");
})