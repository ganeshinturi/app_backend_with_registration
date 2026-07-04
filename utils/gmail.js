const nodemailer = require("nodemailer");

// Create a transporter using SMTP
let mail=async (email,username)=>{
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'ganainturi5@gmail.com',
    pass: 'qpjc fgit juwk cegs',
  },
});

let message={
    from: 'ganainturi5@gmail.com',
    to: email,
    subject: "account creation",
    text: "welcome",
    html: `<b>Hi welcome ${username}.your account has been created</b>`
}

await transporter.sendMail(message);
console.log('email sent')
}
module.exports=mail