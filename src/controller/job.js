const cron = require("node-cron");
const schedule = require("node-schedule");
const schedulerModel = require("../models/job");

const { sendMail } = require("../utility/mail");
const { createTime } = require("../utility/helper");

const exportable = {
  create: async (req, res) => {
    try {
      const jobDetails = req.body;
      let data = await schedulerModel.create(jobDetails);
      data = JSON.parse(JSON.stringify(data));
      if (data) {
        const id = data._id;
        const date = createTime(data.time);

        var j = await schedule.scheduleJob(id, new Date(date), async () => {
          try {
            sendMail(data);
          } catch (error) {
            await schedulerModel.findByIdAndUpdate(id, { isFailed: true });
          }
        });
        if (j) {
          res.send(data);
        } else {
          res.status(400).send({ message: "error in scheduling job" });
        }
      } else {
        res.status(400).send({ message: "error in inserting the data" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.body._id;
      const updatedData = req.body;
      const data = await schedulerModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (data) {
        const date = createTime(data.time);
        var my_job = schedule.scheduledJobs[id];
        my_job.cancel();
        var j = await schedule.scheduleJob(id, new Date(date), async () => {
          try {
            sendMail(data);
          } catch (error) {
            await schedulerModel.findByIdAndUpdate(id, { isFailed: true });
          }
        });
        if (j) {
          res.send(data);
        } else {
          res.status(400).send({ message: "error in rescheduling job" });
        }
      } else {
        res.status(400).send({ message: "No data found" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  list: async (req, res) => {
    try {
      const data = await schedulerModel.find();
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({ message: "No data found" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  read: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await schedulerModel.findById(id);
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({ message: "No data found" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await schedulerModel.findByIdAndUpdate(
        id,
        { isFailed: true },
        { new: true }
      );
      if (data) {
        var my_job = schedule.scheduledJobs[id];
        my_job.cancel();
        res.status(200).send({ message: "Job cancelled successfully" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  fail: async (req, res) => {
    try {
      const data = await schedulerModel.find({ isFailed: true });
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({ message: "No data found" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = exportable;
