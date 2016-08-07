
const exec    = require('child_process').exec;
const CronJob = require('cron').CronJob;
const OneDevNpm = require('./OneDevNpm');

const cron = new CronJob({
  // cronTime: "*/1 * * * *",
  cronTime: "00 21 * * *",
  onTick() {
    console.log("task Start!!");
    OneDevNpm.announce("1/2");
    OneDevNpm.announce("2/2");
  },
  onComplete() {
    console.log("task complete");
  },
  start: true,
  timeZone: "Asia/Tokyo"
});
