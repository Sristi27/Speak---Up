var express=require('express');
var cors=require('cors');
var bodyparser=require('body-parser');
var multer=require('multer');
var mongoose=require('mongoose');
const path=require('path')


mongoose.connect(process.env.MONGODB_URI || 
    "mongodb+srv://username:<password>@cluster0.xsqn2.mongodb.net/<posts>?retryWrites=true&w=majority"
                // Add your own mongo url 
,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},
(err) => {
    if (!err) {
        console.log("Database connected");
    } else {
        console.log(err);
    }
})

require("./models/postmodel")
require('./models/authmodel');

var app=express();

const PORT=process.env.PORT || 5000;

app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/post'));
app.use(require('./routes/auth'));

if(process.env.NODE_ENV=="production")
{
    app.use(express.static('client/build'));
    const path=require('path') //path module
    app.get("*",(req,res)=>
    {
        res.sendFile(path.resolve(__dirname,'client','build','index.html')) //static file
        //if client will be making any req,then index.html will be sent for all cases.Index.html has all the react code
    })
}


app.listen(PORT,()=>
{
    console.log("Server running")
})
