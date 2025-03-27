import mailer from "nodemailer";
import  config  from "../../config/config.js";
import MailGateway from "./MailGateway.js";

class BasicEmailGateway extends MailGateway {
    #instance;

    constructor() {
        super();
            this.transport = mailer.createTransport(config.emailConfig.basic);
    }
    async sendRegistrationEmail (email, token) {
        const confirmationLink = `http://localhost:8000/user/activate/${token}`;
        const subject = "Registration Confirmation";
        const message = `Click on the link to confirm your registration: ${confirmationLink}`;
       
        return await this.send(email, subject, message);
        
    };

    async send(email, subject, message) {
        return await this.transport.sendMail({
            from: `"Todolist service" <${config.emailConfig.basic.auth.user}>`,
            to: email,
            subject: subject,
            text: message
        });
    }
}

export default BasicEmailGateway;