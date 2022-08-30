var nodemailer = require('nodemailer');
 var sesTransport = require('nodemailer-ses-transport');
 const { ACCESSKEY_ID, SECRET_ACCESS_KEY, FIRM_EMAIL } = require('../configuration/configuration');
 const { createEmailToken, passwordRecoveryToken } = require('./tokenGenerator');





 exports.transporter = nodemailer.createTransport(sesTransport({
   accessKeyId: ACCESSKEY_ID,
   secretAccessKey: SECRET_ACCESS_KEY,
   rateLimit: 5
 }));


 exports.emailTokenSender = (transporter, id, receiverEmail) => {

         var user_id = id
         const emailToken = createEmailToken(user_id, receiverEmail)
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





 exports.resetTransporter = nodemailer.createTransport(sesTransport({
   accessKeyId: ACCESSKEY_ID,
   secretAccessKey: SECRET_ACCESS_KEY,
   rateLimit: 5
 }));



exports.passwordRecoveryTokenSender = (resetTransporter, id, receiverEmail) => {

          //
    const passwordRecoveryTokenn =  passwordRecoveryToken(id, receiverEmail)
    
    const url = `http://localhost:5000/api/user/reset-passkey/${passwordRecoveryTokenn}`

    var mailOptions = {
        from: `MallamTY Communications <${FIRM_EMAIL}>`,
        to: receiverEmail, // list of receivers
        subject: 'Password Recovery Link',// Subject line
        html: `Please click on this link to reset your password: <a href = '${url}'>${url}</a>`
    
      };
  
    resetTransporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email verification link successfully sent ..........`);
        }
      });

}

