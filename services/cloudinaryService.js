const nodemailer = require('nodemailer');

const sendVerificationEmail = async (userEmail, userId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: http://localhost:5000/verify/${userId}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadAvatar = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = { uploadAvatar };
