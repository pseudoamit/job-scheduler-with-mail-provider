const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");

sgMail.setApiKey(keys.sendgridAPI);

module.exports = {
  sendMail: function (data) {
    const recipient = data.email.map((e) => ({
      email: e,
    }));
    const msg = {
      to: recipient,
      from: "aroy9930@gmail.com",
      subject: data.subject,
      text: data.body,
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    sgMail
      .send(msg)
      .then((res) => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
