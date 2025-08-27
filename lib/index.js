"use strict"

const {
    MailerSend,
    EmailParams,
    Sender,
    Recipient
} = require("mailersend");

let mailerSend;

class BloggifyMailersend {

    /**
     * @name bloggify:init
     * @function
     * @param {Object} config
     *
     *   - `key` (String): The MailerSend API key.
     */
    static init (config) {
        mailerSend = new MailerSend({
            apiKey: config.key
        });
    }

    /**
     * send
     * Send an email.
     *
     * @name send
     * @function
     * @param {Object} message An object containing:
     * 
     *   - `to_email` (String): The recipient email address.
     *   - `to_name` (String): The recipient name.
     *   - `from_email` (String): The sender email address.
     *   - `from_name` (String): The sender name.
     *   - `subject` (String): The email subject.
     *   - `text` (String): The email text content.
     *   - `html` (String): The email HTML content.
     *
     * @returns {Promise} A promise resolving the result from MailerSend.
     */
    static async send (message) {

        if (process.env.NODE_ENV !== "production") {
            console.log(`[mailersend] Sending email:`)
            Object.keys(message).forEach(k => {
                console.log(`  - ${k}: ${message[k]}`)
            })
            return;
        }

        const sentFrom = new Sender(
            message.from_email,
            message.from_name
        );

        const recipients = [
            new Recipient(message.to_email, message.to_name)
        ];

        let emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject(message.subject)

        if (emailParams) {
            emailParams = emailParams.setHtml(message.html || message.text)
        }

        if (message.text) {
            emailParams = emailParams.setText(message.text)
        }

        let res = null

        try {
            res = await mailerSend.email.send(emailParams)
        } catch (e) {
            throw e
        }

        return res
    }
}

BloggifyMailersend.mailerSend = mailerSend

module.exports = BloggifyMailersend