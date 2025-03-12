import mailer from "nodemailer";
import  config  from "../../config/config.js";

const sendRegistrationEmail = async (email, token) => {
    const confirmationLink = `http://localhost:8000/user/activate/${token}`;
    const subject = "Registration Confirmation";
    const message = `Click on the link to confirm your registration: ${confirmationLink}`;
    const transporter = mailer.createTransport(config.emailConfig);

    
    
    return await transporter.sendMail({
        from: `"Todolist service" <${config.emailConfig.auth.user}>`,
        to: email,
        subject: subject,
        text: message
    });
};

export default { sendRegistrationEmail };
