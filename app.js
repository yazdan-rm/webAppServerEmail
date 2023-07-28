const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res)=>{
    
    res.sendFile(__dirname+ "/signup.html");
});


let firstName, lastName, email;

app.post("/", (req, res)=>{
    
    firstName = req.body.fName;
    lastName = req.body.lName;
    email = req.body.email;


    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed", 
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);
    
    url = "https://us10.api.mailchimp.com/3.0/lists/05b435eaf8";
    
    const option = {
        method:"POST",
        auth: "yazdan1:dfc7472b7d1815c34b7074dec1e89339-us10"
    }
    
    const request = https.request(url, option, (response)=>{
    
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })

        console.log(response.statusCode);
        if(response.statusCode === 200) res.sendFile(__dirname + "/success.html");

        res.sendFile(__dirname + "/failure.html");
        
    });
    
    request.write(jsonData);
    request.end();
});


app.post("/failure", (req, res)=>{
    
    res.redirect("/");
})



app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port ${port}.`);
})

//API key   
// dfc7472b7d1815c34b7074dec1e89339-us10


//List ID
//05b435eaf8
