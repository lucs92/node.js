import MailGateway from "./MailGateway.js";

class FakeEmailGateway extends MailGateway {
    #instance;

    constructor(){
        super()
        if(this.#instance){
            return this.#instance;
        }
        this.#instance = this;
    }
    
    async sendRegistrationEmail (email, token) {
        const confirmationLink = `http://localhost:8000/user/activate/${token}`;
        const subject = "Registration Confirmation";
        const message = `Click on the link to confirm your registration: ${confirmationLink}`;
       
        return await this.send(email, subject, message);
        
    };

    async send(email, subject, message) {
        console.log("Sto inviando la email");
    }
}

export default FakeEmailGateway;