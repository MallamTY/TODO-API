
var request = require('request');

exports.sendOTP = (userPhoneNumber, otp) => {
    var data = {
    "api_key" : "TLUjPu3HHldq08vQvrLhfABaNwvpd9yPPuFlMntIrLy2VvkYgNfhgph18OJt3K",
    "message_type" : "ALPHANUMERIC",
    "to" : userPhoneNumber,
    "from" : "MallamTY",
    "channel" : "generic",
    "pin_attempts" : 5,
    "pin_time_to_live" : 20,
    "pin_length" : 6,
    "pin_placeholder" : otp,
    "message_text" : `Your one time password OTP is ${otp}`,
    "pin_type" : "NUMERIC"
    };

     var options = {
     'method': 'POST',
     'url': 'https://api.ng.termii.com/api/sms/otp/send',
     'headers': {
     'Content-Type': ['application/json', 'application/json']
     },
     body: JSON.stringify(data)
   
     };
   
     request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
   
      })  
}
