const express = require('express');
const fs = require('fs')
const app = express()


// Async 
app.get('/asyncWay', (req,res,next)=>{
    fs.readFile('/not-exist', (err, data)=>{
        if(err){
            next(err)
        }else{
            res.send(data)
        }
    })
})
/////
app.get('/readFile', [(req,res,next)=>{
    fs.readFile('/not-exist', (err, data)=>{
        console.log(data)
        next(err)
    })
},(req,res,next)=>{
    console.log(data.property)
}])

//Try Catch
app.get('/try', (req,res,next)=>{
    setTimeout(function(){
        try{
            console.log(a)
        }catch(err){
            next(err)
        }
    },100)
})

app.use((req,res,next)=>{
    console.log('I\'m not a called')
    next()
})


app.get('/write', (req,res)=>{
    for(let i = 0; i<=10; i++){
        if(i === 5){
            next('There was an Error')
        }else{
            res.write('a')
        }
    }
})
//404 Error Handler 
app.use((req,res,next)=>{
    // res.status(404).send('Requested URL not found')
    next('Requested URL not found')
})

app.use((err, req, res, next)=>{
    if(res.headersSent){
        next('There was a Problem')
    }else{
        if(err.message){
            res.status(500).send(err.message)
        }else{
            res.status(500).send('There was an Error')
        }
    }    
})
app.use((err, req, res, next)=>{
    if(err.message){
        res.status(500).send(err.message)
    }else{
        res.status(500).send('There was an Error')
    }
    
})
app.listen(3000, ()=>{
    console.log('Server is running in 3000')
})