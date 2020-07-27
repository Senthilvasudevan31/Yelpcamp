var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comment"); 

var data = [
    {
        name: "Tree", 
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        description: "blah blah blah"
    },
     {
         name: "Desert Mesa", 
         image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
         description: "blah blah blah"
     },
     {
         name: "Canyon Floor", 
         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
         description: "blah blah blah"
    }
]

function seedDB(){
   //Remove all campgrounds
   campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
    //     console.log("removed campgrounds!");
    //      //add a few campgrounds
    //     data.forEach(function(seed){
    //         campground.create(seed, function(err, campground){
    //             if(err){
    //                 console.log(err)
    //             } else {
    //                 console.log("added a campground");
    //                 //create a comment
    //                 comment.create(
    //                     {
    //                         text: "This place is great, but I wish there was internet",
    //                         author: "Homer"
    //                     }, function(err, comment){
    //                         if(err){
    //                             console.log(err);
    //                         } else {
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log("Created new comment");
    //                         }
    //                     });
    //             }
    //         });
    //     });
    }); 
    //add a few comments
}

module.exports = seedDB;