const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const sweetalert = require('sweetalert');
const bodyParser = require('body-parser');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;

const app = express();
// Bring in models 
let Track = require('./models/track');
let Comment = require('./models/comment');

// set view engine
app.set('view engine', 'ejs');

// Body Parser Middleware - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongob');
})


// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


// create home route
app.get('/', (req, res) => {
    Track.find({}, function(err, tracks){
        if(err){
            console.log(err);
        }else{
            res.render('home', {
                user: req.user,
                title: "Tracks",
                tracks: tracks
                
            });
        }
    });
});

//Get track page
app.get('/track/:id', (req, res) => {
    Track.findById(req.params.id, (err, track) => {
        if(err){
            console.log(err);
        }else{
        res.render('track', {
            user: req.user,
            track: track,
        });
    }
    })
})


// Upload route
app.get('/tracks/upload', (req, res) => {
    res.render('uploadTrack', {
        user: req.user,
        title: 'Upload Tracks'
    });
});

// Submit a track
app.post('/tracks/upload', (req, res) =>{
    let track = new Track();
    track.title = req.body.title;
    track.artist = req.user.username;
    track.link = req.body.link;
    track.description = req.body.description;
    track.genre = req.body.genre;
    track.trackType = req.body.trackType;
    track.trackID = track._id;
    // track.host = req.body.host;
    // console.log(track.host);
    
    
    
    track.save((err) =>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/')
        }
    });
});

// Comments
app.get('/track/:id', function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            console.log(err);
        }else{
            res.render('/track/:id', {
                user: req.user,
                title: 'Comments',
                comments: comments
            });
        }
    
    });
});



app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});