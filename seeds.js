let mongoose = require("mongoose");
let Article = require("./models/article");
let Comment   = require("./models/comment");
 
// DATA USED FOR SCHEME TESTING
let data = [
    {
        title: "Drone-Based Air Quality Analyzer Developed", 
        image: "https://www.unmannedsystemstechnology.com/wp-content/uploads/2020/08/Scentroid-DR2000-air-quality-analyzer.jpg",
        content: "Scentroid has launched the DR2000, a new air quality analyzer designed to be mounted on UAVs (unmanned aerial vehicles). " + 
                 "It has been developed to analyse ambient air at heights of up to 125 meters above ground level, which the company claims had " + 
                 "not been accomplished prior to the development of this system. The DR2000 features built-in sensors that provide remote monitoring " + 
                 "of a variety of chemical compounds. The system allows researchers to conduct both impact assessments and air quality measurements for a " + 
                 "wide range of applications, including the monitoring of fugitive emissions, flare emissions, pipeline leak detection, methane from landfill sites, " + 
                 "agricultural or cannabis facilities, odour emissions, military or emergency applications, urban scanning, and more. Weighing just 800 grams, the DR2000 " + 
                 "can be mounted on a range of different drones. It takes advantage of the latest advances in sensor technology to provide highly stable and accurate readings, " + 
                 "and is packaged with Scentroid’s DRIMS2 software that provides clear, concise, and easy to understand data for thorough environmental analysis. "
    },
    {
        title: "Self-driving cars: How close are we from full autonomy?", 
        image: "https://specials-images.forbesimg.com/imageserve/1177351973/960x0.jpg?cropX1=0&cropX2=5721&cropY1=368&cropY2=3587",
        content: "It’s unquestionable that full self-driving technology (or level 5 autonomy) will be part of our future. The question is — when it will arrive? Next decade? Next " + 
                 " 5 years? Next year? Tomorrow? Let’s look at the current state-of-the-art and make a prediction. Which company will get there first? If anyone can solve full self-driving " + 
                 "(level 5 autonomy) by 2025, it will be Tesla. You may have heard about Waymo robot taxis but those operate in very restricted regions and require a high-resolution mapping and " + 
                 "preparation of the routes (level 4 autonomy). It’s a good attempt but the current approach is not scalable. The main reasons Tesla will be the first to solve full self-driving are: " + 
                 "Data - They have the largest real-world dataset with billions of driven miles. Efficient hardware: A smart set of sensors and an in-house designed deep learning chip. Advanced software: " + 
                 "The neural network driving Teslas is a very complex multi-task problem. Spoiler: Probably no later than 2025."
    },
    {
        title: "React v17.0 Release Candidate: No New Features", 
        image: "https://i.morioh.com/2934a8d84c.png",
        content: "Today, we are publishing the first Release Candidate for React 17. It has been two and a half years since the previous major release of React, which is a long time even by our standards! In " + 
                "this blog post, we will describe the role of this major release, what changes you can expect in it, and how you can try this release. The React 17 release is unusual because it doesn’t add any new developer-facing " + 
                "features. Instead, this release is primarily focused on making it easier to upgrade React itself. We’re actively working on the new React features, but they’re not a part of this release. The React 17 release is a key " + 
                "part of our strategy to roll them out without leaving anyone behind. In particular, React 17 is a “stepping stone” release that makes it safer to embed a tree managed by one version of React inside a tree managed by a " + 
                "different version of React."
    }
]
 
function seedDB(){
   Article.remove({}, function(err){ 
    // Removes every Article or Blog Post    
    }); 
}
 
module.exports = seedDB;
