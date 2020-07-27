var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose =require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var campground = require("./models/campground");
var comment=require("./models/comment");
var User = require("./models/user");
var seedDB      = require("./seeds");

//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
mongoose.connect("mongodb+srv://Senthilvasudevan:kanchipuram@cluster0.ljexq.mongodb.net/yelpcamp?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true});
// mongoose.connect("mongodb://localhost/yelpcamp",{useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
 // seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Using the username in all routes
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


// var campgroundSchema = new mongoose.Schema({
//    name: String,
//    image: String,
//    description: String
// });

// var campground = mongoose.model("campground", campgroundSchema);

// app.get("/",function(req,res){
// 	res.render("landing");
// });

// //INDEX ROUTE--campground page

// app.get("/campgrounds",function(req,res){
// 	campground.find({},function(err,allcampgrounds){
// 		if(err){
// 			console.log(err);
// 		}else{		
// 		res.render("campgrounds/index",{campgrounds:allcampgrounds});
// 		}
// 	});
	
// });

// //crete route -- new adding

// app.post("/campgrounds",function(req,res){
// 	var name=req.body.name;
// 	var image=req.body.image;
// 	var desc=req.body.description;
// 	var newCampground={name:name,image:image,description:desc};
// 	campground.create(newCampground,function(err,newlycreated){
// 		if(err){
// 			console.log(err);
// 		}else{
			
// 			res.redirect("/campgrounds");
// 		}
// 	});	
// });

// //new -- page route

// app.get("/campgrounds/new",function(req,res){
// 	res.render("campgrounds/new");
// });


// // SHOW - shows more info about one campground
// app.get("/campgrounds/:id", function(req, res){
//     //find the campground with provided ID
//     campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {
//             //render show template with that campground
//             res.render("campgrounds/show", {campground: foundCampground});
//         }
//     });
// });
//comments route

// app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
//     // find campground by id
//     campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//              res.render("comments/new", {campground: campground});
//         }
//     })
// });


// app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
//    //lookup campground using ID
//    campground.findById(req.params.id, function(err, campground){
//        if(err){
//            console.log(err);
//            res.redirect("/campgrounds");
//        } else {
//         comment.create(req.body.comment, function(err, comment){
//            if(err){
//                console.log(err);
//            } else {
//                campground.comments.push(comment);
//                campground.save();
//                res.redirect('/campgrounds/' + campground._id);
//            }
//         });
//        }
//    });
//    //create new comment
//    //connect new comment to campground
//    //redirect campground show page
// });

// //  ===========
// // AUTH ROUTES
// //  ===========

// // show register form
// app.get("/register", function(req, res){
//    res.render("register"); 
// });
// //handle sign up logic
// app.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//            res.redirect("/campgrounds"); 
//         });
//     });
// });

// // show login form
// app.get("/login", function(req, res){
//    res.render("login"); 
// });

// // handling login logic
// app.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/campgrounds",
//         failureRedirect: "/login"
//     }), function(req, res){
// });

// // logic route
// app.get("/logout", function(req, res){
//    req.logout();
//    res.redirect("/campgrounds");
// });

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }



app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP,function(){
	console.log("Yelpcamp has started");
});