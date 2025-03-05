import nodemailer from "nodemailer";
import  config  from "../../config/config.js";

const sendRegistrationEmail = async (email, link) => {
    const subject = "Registration Confirmation";
    const message = `Click on the link to confirm your registration: ${link}`;
    
    return await nodemailer.createTransport(config.emailConfig).sendMail({
        from: `"Todolist service" <${config.emailConfig.auth.user}>`,
        to: email,
        subject: subject,
        text: message
    });
};

export default { sendRegistrationEmail };
