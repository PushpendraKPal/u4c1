const express = require("express");
const req = require("express/lib/request");
const app = express();


//middelewares

app.use(express.json());

app.use(logger);

function logger(req, res, next){
    console.log(req.url);
    next();
}

function checkPermission(data){
    return (req, res, next)=>{
        if (req.url == `/${data}`)
        req.permission = true;
        else
        req.permission = false;

        next();
    }
    
}


// routes



app.get('/books',(req, res)=>{
    res.send({ route: "/books"});
})

app.get('/libraries',checkPermission("libraries"),(req, res)=>{
    res.send({ route: "/libraries", permission: req.permission});
})

app.get('/authors',checkPermission("authors"),(req, res)=>{
    res.send({ route: "/authors", permission: req.permission});
})




app.listen('5000', ()=>{
    console.log("Server running on port 5000");
})