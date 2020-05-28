const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactMusic', {useNewUrlParser: true});
const port = 7000;

//Defining Mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    message: String
  });
var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.pug', params);
})

app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.status(200).render('alert.pug');
    }).catch(()=>{
        res.status(400).send("Item not saved to DB")
    })
    //res.status(200).render('contact.pug');
});

app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});