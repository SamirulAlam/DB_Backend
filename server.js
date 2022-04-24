const mysql=require("mysql");
const express=require("express");
const bodyParser=require("body-parser");
const Cors=require("cors");

const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(Cors());

const con=mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'db_project'
})

con.connect(function(err){
    if(err) throw err
})

app.get('/users',(req, res)=>{
    con.query("select username,image_url,photos.id as photoId,photos.created_at as date from users,photos where users.id=photos.user_id",(err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
})

app.get('/photos',(req, res)=>{
    con.query("SELECT * FROM photos",(err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
})

app.get('/likes',(req, res)=>{
    con.query("SELECT * FROM likes",(err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
})

app.get('/comments:id',(req, res)=>{

    
    con.query(`select username,comment_text,comments.created_at as date from users,comments where comments.user_id=users.id and comments.photo_id=${id}`,(err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
})

app.get('/follows',(req, res)=>{
    con.query("SELECT * FROM follows",(err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
})

app.get('/tags',(req, res)=>{ 
    con.query("SELECT tags.tag_name as tagName,Count(*) AS total FROM   photo_tags JOIN tags ON photo_tags.tag_id = tags.id GROUP  BY tags.id ORDER  BY total DESC",(err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
})

app.get('/post',(req, res)=>{
    con.query("Select users.id as userId, username, count(photos.user_id) as total from users, photos where users.id = photos.user_id group by photos.user_id",(err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
})

const port=process.env.PORT || 4000

app.listen(port,()=> console.log(`Port ${port}`))