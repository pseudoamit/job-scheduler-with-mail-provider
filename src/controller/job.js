const cron = require("node-cron");
const schedulerModel = require("../models/job");
const { sendMail } = require("../utility/mail");

const exportable = {
  createScheduling: async (req, res) => {
    try {
      //   sendMail();
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = exportable;
