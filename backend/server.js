var express = require('express');//loading express framework
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');

//connection to mongo db
mongoose.connect('mongodb://localhost:27017/MongoDatabase');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("you are connected with mongo db");
});
//starting server 
app.listen(3010, function () {
    console.log("Started on PORT 3010");
})


app.use(function(req, res, next) {
   // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }));
//var jwt = require('jsonwebtoken');
//getting collection 



function validate(data) {
    let errors = {}

    if (data.title === "") errors.title = 'Title Cant be Empty';
    if (data.cover === "") errors.cover = 'Cover cant be empty';
    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid }
}
app.post('/api/login',function(req,res)
{         
})

app.post('/api/blogs', function (req, res) {
    console.log(req.body);
    const { errors, isValid } = validate(req.body);
    if (isValid) {
        const { title, cover } = req.body;
        db.collection('blogs').insert({ title, cover }, (err, result) => {
            if (err) {
                res.status(500).json({ global: 'Something Went wrong' })
            }
            else {
                res.json({ blogs: result });
            }
        })
    }
    else {
        res.status(400).json({ title: errors.title, cover: errors.cover });
    }

})
app.get('/api/blogs', function (req, res) {
    db.collection('blogs').find({}).toArray((err, blogs) => {
        if (err) {
            console.log('Error', err)
        }
        else 
        {
            res.json(blogs);
        }
    })
})
app.get('/api/blogs/:id',function(req,res)
{
    console.log('Callled',req.params.id)
    db.collection('blogs').findOne({_id: mongoose.Types.ObjectId(req.params.id)},(err,game) =>
    {
       if(err)
       {
           console.log('ERRRRRROR',err)
       }
       else
       {
            res.json(game);
       }
    })
})
app.put('/api/blogs/:id',function(req,res)
{    const { errors, isValid } = validate(req.body);
if (isValid) {
    const { title, cover } = req.body;
    db.collection('blogs').findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(req.params.id)},
        {$set:{title,cover}},
        {returnOriginal:false},
        (err,response) =>
    {
        res.json(response);
    })
}
})
app.get('/api/blogdelete/:id',function(req,res)
{
      db.collection('blogs').findOneAndDelete({_id: mongoose.Types.ObjectId(req.params.id)}, (err,response) =>
    {
        res.json(response);
    })
})

app.post('/api/registration', function (req, res) {		
        const { full_name, email,password} = req.body;
        db.collection('users').insert({ full_name, email,password }, (err, result) => {
            if (err) {
                res.status(500).json({ global: 'Something Went wrong' })
            }
            else {
                res.json({ blogs: result });
            }
        })    
})

app.use((req, res) => {
    res.status(404).json({
        global: 'Still working on it.Please try again later when we implement it'
    })
})

