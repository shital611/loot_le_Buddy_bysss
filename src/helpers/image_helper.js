const multer = require('multer');
 
var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './assets/videos');  
  },  
  filename: function(req, file, callback) {
    console.log(file);
    if(file.originalname.length>6)
      callback(null, file.fieldname + '-' + Date.now() + file.originalname.substr(file.originalname.length-6,file.originalname.length));
    else
      callback(null, file.fieldname + '-' + Date.now() + file.originalname);
 
  }
});  
var upload = multer({ storage : storage});  
 
// module.exports = upload;

// const path = require('path');
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//        if (file.fieldname === "profile") {
//            cb(null, './uploads/profiles/')
//        }
//        else if (file.fieldname === "natid") {
//            cb(null, './uploads/ids/');
//        }
//        else if (file.fieldname === "certificate") {
//            cb(null, './uploads/certificates/')
//        }
//     },
//     filename:(req,file,cb)=>{
//         if (file.fieldname === "profile") {
//             cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
//         }
//       else if (file.fieldname === "natid") {
//         cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
//       }
//       else if (file.fieldname === "certificate") {
//         cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
//       }
//     }
// });
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 10
//     },
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     }
// }).fields(
//     [
//         {
//             name:'profile',
//             maxCount:1
//         },
//         {
//             name: 'natid', maxCount:1
//         },
//         {
//             name: 'certificate', maxCount:1
//         }
//     ]
// );

// function checkFileType(file, cb) {
//     if (file.fieldname === "certificate") {
//         if (
//             file.mimetype === 'application/pdf' ||
//             file.mimetype === 'application/msword' ||
//             file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//           ) { // check file type to be pdf, doc, or docx
//               cb(null, true);
//           } else {
//               cb(null, false); // else fails
//           }
//     }
//     else if (file.fieldname === "natid" || file.fieldname === "profile") {
//         if (
//             file.mimetype === 'image/png' ||
//             file.mimetype === 'image/jpg' ||
//             file.mimetype === 'image/jpeg'||
//             fiel.mimetype==='image/gif'
//           ) { // check file type to be png, jpeg, or jpg
//             cb(null, true);
//           } else {
//             cb(null, false); // else fails
//           }
//         }
//     }


   
 
module.exports = upload;