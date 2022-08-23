exports.generateOTP = (lengthOTP) => {
    var digit = '0123456789';
    let OTP = "";
    for (let i = 0; i < lengthOTP; i++){
        OTP += digit[Math.floor(Math.random() * 10)]
    }
    return OTP;
    
};