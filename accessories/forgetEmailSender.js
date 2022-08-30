var nodemailer = require('nodemailer');
 var sesTransport = require('nodemailer-ses-transport');
 const { ACCESSKEY_ID, SECRET_ACCESS_KEY, FIRM_EMAIL } = require('../configuration/configuration');
 const { createEmailToken, passwordRecoveryToken } = require('./tokenGenerator');





 exports.transporter = nodemailer.createTransport(sesTransport({
   accessKeyId: ACCESSKEY_ID,
   secretAccessKey: SECRET_ACCESS_KEY,
   rateLimit: 5
 }));

exports.passwordRecoveryTokenSender = (transporter, id, receiverEmail) => {

          //
    const passwordRecoveryTokenn =  passwordRecoveryToken(id)
    
    const url = `http://localhost:5000/api/user/reset-passkey/${passwordRecoveryTokenn}`

    var mailOptions = {
        from: `MallamTY Communications <${FIRM_EMAIL}>`,
        to: receiverEmail, // list of receivers
        subject: 'Password Recovery Link',// Subject line
        html: `Please click on this link to reset your password: <a href = '${url}'>${url}</a>`
    
      };
  
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email verification link successfully sent ..........`);
        }
      });
   // transporter.sendMail(

}