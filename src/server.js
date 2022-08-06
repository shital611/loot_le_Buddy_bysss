const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const connectDatabase = require('./db/conn.js')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const Admin = require('./models/adminSchema')
const poolSchema = require('./models/urlSchema')
const usersData=require('./models/users')
const Participants=require('./models/participants')
const winnerHistoryData=require('./models/winnerHistory')
const upload_file = require('./helpers/image_helper.js')
dotenv.config();
connectDatabase();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(express.static('./assets/videos')); 
app.use(bodyparser.json());
const PORT = process.env.PORT || 3000
const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

app.use(express.static(static_path))
app.set('view engine', 'hbs')
app.set('views', template_path)
hbs.registerPartials(partials_path)

const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));
app.get('/logout',async(req,res) => {
    res.render('login')
})

app.get('/login',async(req,res) => {
        res.render('login')
})

app.post('/login',async(req,res) => {
    try {
    const email = req.body.email
    const password = req.body.password
    
    const adminemail = await Admin.findOne({email:email})
    
    if(adminemail.password === password){
        req.session.user = req.body.email;
        res.render('index', {user : req.session.user})    
    }
    else{
        res.send("Invalid login details")
    }
    } catch (error) {
        res.status(400).send(error.message)
   }
})

app.get('/adduser',async(req,res) => {
    res.render('add')
})

app.get('/addpool',async(req,res) => {
    res.render('add')
})


app.post('/addpool',upload_file.single('Hemper1'),function (req,res){
    //fileSave();
    // console.log(req.file);
    var data = new poolSchema();
 
    data.PoolID = req.body.PoolID;
    data.PoolName = req.body.PoolName;
    // data.url_desc = req.body.url_desc;
   data.Hemper1 = req.file.filename;
   data.Hemper1Worth = req.body.Hemper1Worth;
   data.Hemper2 = req.file.filename;
   data.Hemper2Worth = req.body.Hemper2Worth;
   data.Hemper3 = req.file.filename;
   data.Hemper3Worth = req.body.Hemper3Worth;
   data.CoinsNeededToParticipate = req.body.CoinsNeededToParticipate;
   data.PoolStartDate = req.body.PoolStartDate;
   data.PoolEndDate = req.body.PoolEndDate;
    var save = data.save();
       
    if (save)
       res.redirect('/getpool');
    else
    console.log('Error during record insertion : ' + err);  
   });
   


   app.post('/adduser',upload_file.single('Profile_Pic'),function (req,res){
    //fileSave();
    // console.log(req.file);
    var data = new usersData();
 
    data.UserID = req.body.UserID;
    data.Name = req.body.Name;
   data.ProfilePic = req.file.filename;
   data.Hemper1Worth = req.body.Hemper1Worth;
   data.PhoneNo = req.body.PhoneNo;
   data.Address = req.body.Address;
   data.Coins = req.body.Coins;
   data.OTP = req.body.OTP;
   data.CreatedDate = req.body.CreatedDate;
    var save = data.save();
       
    if (save)
       res.redirect('/getuser');
    else
    console.log('Error during record insertion : ' + err);  
   });
   

   //----------------------------------------using fields--------------------------------------------------------------

   /*
   app.post('/addpool', upload_file.fields([
    {
        name:'Hemper1',maxCount: 1
    },
    {
        name:'Hemper2',maxCount:1
    },
    {
        name:'Hemper3',maxCount:1
    }
]),function (req,res){
    //fileSave();
    // console.log(req.file);
    var data = new poolSchema();
 
    data.PoolID = req.body.PoolID;
    data.PoolName = req.body.PoolName;
    data.Hemper1 = req.file.Hemper1[0];
   data.Hemper1Worth = req.body.Hemper1Worth;
   data.Hemper2 = req.file.Hemper2[0];
   data.Hemper2Worth = req.body.Hemper2Worth;
   data.Hemper3 = req.file.Hemper3[0];
   data.Hemper3Worth = req.body.Hemper3Worth;
   data.CoinsNeededToParticipate = req.body.CoinsNeededToParticipate;
   data.PoolStartDate = req.body.PoolStartDate;
   data.PoolEndDate = req.body.PoolEndDate;
   var save = data.save(PoolID,PoolName,Hemper1.filename,Hemper1Worth,Hemper2.filename,Hemper2Worth,Hemper3.filename,Hemper3Worth,CoinsNeededToParticipate,PoolStartDate,PoolEndDate);
       
    if (save)
       res.redirect('/getpool');
    else
    console.log('Error during record insertion : ' + err);  
   });

   */
   
//----------------------------------------finish using fields--------------------------------------------------------------

// app.post('/addpool',upload_file(req, res, (err) => 
//     {
//         if (err) 
//         {
//             console.log(err);
//         } else 
//         {
//             if (req.file == "undefined") 
//             {
//                 console.log("No image selected!")
//             } 
//             else 
//             {
//             //fileSave();
//             // console.log(req.file);
//             var data = new poolSchema();
 
//             data.PoolID = req.body.PoolID;
//             data.PoolName = req.body.PoolName;
//             // data.url_desc = req.body.url_desc;
//             data.Hemper1 = req.file.filename;
//             data.Hemper1Worth = req.body.Hemper1Worth;
//             data.Hemper2 = req.file.filename;
//             data.Hemper2Worth = req.body.Hemper2Worth;
//             data.Hemper3 = req.file.filename;
//             data.Hemper3Worth = req.body.Hemper3Worth;
//             data.CoinsNeededToParticipate = req.body.CoinsNeededToParticipate;
//             data.PoolStartDate = req.body.PoolStartDate;
//             data.PoolEndDate = req.body.PoolEndDate;
//             var save = data.save();
       
//             if (save)
//                 res.redirect('/getpool');
//             else
//                 console.log('Error during record insertion : ' + err);  
//             }
//         }
//     }
//     )
//    );

// Dsiplay Data 
app.get('/getpool', async(req,res) => {
    poolSchema.find((err, data) => {
        if (!err) {
            res.render('index', {
                list: data
            });
        }
        else {
            console.log('Error in retrieving url list :' + err);
        }
    })

    
})

app.get('/getuser', async(req,res) => {
    usersData.find((err, data1) => {
        if (!err) {
            res.render('index1', {
                list1: data1
            });
        }
        else {
            console.log('Error in retrieving url list :' + err);
        }
    })    
})

// To show select data on update element on edit.hbs page
 app.get('/updatepool/:id', async(req, res) => {
    poolSchema.findById({_id:req.params.id},req.body, { new: true },(err,docs)=>{
        console.log(docs)
       if(err)
       {
           console.log('Cant retrieve data and edit');
       }
       else
       {
           res.render('edit',{urldata:docs});
       }
    })
 });

 app.get('/updateuser/:id', async(req, res) => {
    usersData.findById({_id:req.params.id},req.body, { new: true },(err,docs)=>{
        console.log(docs)
       if(err)
       {
           console.log('Cant retrieve data and edit');
       }
       else
       {
           res.render('edit',{urldata:docs});
       }
    })
 });
  
  
 // Now Update Data here using ID
app.post('/updateuser/:id',async(req,res)=>{
    console.log(req.body)
    poolSchema.findByIdAndUpdate({_id:req.params.id},req.body,(err,docs)=>{
          if(err)
          {
              console.log('Error');
          }  
          else
          {  
              res.redirect('/getuser');
          }
      });
});

// Delete data
app.get('/deletepool/:id', async (req, res) => {
    var uid = req.params.id
    poolSchema.findByIdAndRemove(uid, (err, doc) => {
        if (!err) {
            res.redirect('/getpool');
        }
        else { console.log('Error in video delete :' + err); }
    });
});

app.get('/deleteuser/:id', async (req, res) => {
    var uid = req.params.id
    usersData.findByIdAndRemove(uid, (err, doc) => {
        if (!err) {
            res.redirect('/getuser');
        }
        else { console.log('Error in video delete :' + err); }
    });
});
// api to get all videos
app.get('/GetAllPools', async (req, res) => {
    poolSchema.find().then((result) => {
        res.json(result)


    }).catch((err) => {
        console.log(err)
    })
})

app.get('/GetAlluser', async (req, res) => {
    poolSchema.find().then((result) => {
        res.json(result)


    }).catch((err) => {
        console.log(err)
    })
})


//GetParticularPoolDetail

app.get('/GetParticularPoolDetail/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const getUsers = await poolSchema.findById(_id)
        res.send(getUsers)
    } catch (e) {
        res.status(400).send(e)
    }

})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

// //get user detail
// app.get('/GetUserDetail',async (req,res)=>{
//     try{
//      const getUsers=await usersData.find({}).sort({"UserID":1})
//      res.status(201).send(getUsers)
//     }catch(e){
//          res.status(400).send(e)
//     }
    
//  })



//  //get user detail by id
//  app.get('/GetUserDetail/:id',async (req,res)=>{
//     try{
//     const _id=req.params.id
//     const getUsers=await usersData.findById(_id)
//     res.send(getUsers)
//     }catch(e){
//          res.status(400).send(e)
//     }
    
//  })

 

//  app.delete('/GetUserDetail/:id',async (req,res)=>{
//     try{
//     const _id=req.params.id
//     const getUsers=await usersData.findById(_id)
//     res.send(getUsers)
//     }catch(e){
//          res.status(400).send(e)
//     }
    
//  })


//http://localhost:3000/GetAllPools
//http://localhost:3000/GetParticularPoolDetail/62eb6976abda91f5300b3c30
//http://localhost:3000/GetUserDetail
//http://localhost:3000/GetParticularPoolDetail/62eb6976abda91f5300b3c30

