const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendVerificationEmail = async (email, code) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAILER_USER, // 보내는 사람의 Gmail 계정
        pass: process.env.MAILER_PASS, // 보내는 사람의 Gmail 계정 비밀번호
      },
    });

    const mailOptions = {
      from: process.env.MAILER_USER, // 보내는 사람의 이메일 주소
      to: email, // 수신자 이메일 주소
      subject: "오늘의 영화 회원가입 인증 코드입니다.",
      text: `인증 코드를 입력해 주세요. 인증 코드 : ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(info.response);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendVerificationEmail };
