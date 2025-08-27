"use strict";

const Email = Bloggify.require("bloggify-mailersend");

Email.send({
    to_email: "alice@domain.com"
  , from_email: "bob@domain.com"
  , subject: "Hello world!"
  , text: "This is a test email."
}, (err, data) => {
    console.log(err || data);
});