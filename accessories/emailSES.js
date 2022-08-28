var nodemailer = require('nodemailer');
 var sesTransport = require('nodemailer-ses-transport');
 const { ACCESSKEY_ID, SECRET_ACCESS_KEY, FIRM_EMAIL } = require('../configuration/configuration');
 const { createEmailToken } = require('./tokenGenerator');





 exports.transporter = nodemailer.createTransport(sesTransport({
   accessKeyId: ACCESSKEY_ID,
   secretAccessKey: SECRET_ACCESS_KEY,
   rateLimit: 5
 }));


 exports.emailTokenGenerator = (transporter, id, receiverEmail) => {

         var user_id = id
         const emailToken = createEmailToken(user_id)
         const url = `http://localhost:5000/api/user/confirmation/${emailToken}`

         var mailOptions = {
             from: `MallamTY Communications <${FIRM_EMAIL}>`,
             to: receiverEmail, // list of receivers
             subject: 'Email Address Verification',// Subject line
             html: `Please click on the link below to confirm your email address: <a href = '${url}'>${url}</a>`
          
           };
        
          
         transporter.sendMail(mailOptions, function(error, info) {
           if (error) {
             console.log(error);
           } else {
             console.log(`Email verification link successfully sent ..........`);
           }
         });
  
 }

 //emailGenerator(transporter)