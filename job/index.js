const cron = require('cron');

const oneDay = 24 * 60 * 60 * 1000;
const twoDays = 2 * oneDay;
const threeDays = 3 * oneDay;

const updatePrice = async () => {
  const oneDayAgo = new Date(Date.now() - oneDay);
  const twoDaysAgo = new Date(Date.now() - twoDays);
  const threeDaysAgo = new Date(Date.now() - threeDays);

  await Pastry.updateMany(
    { toMarket: { $lt: oneDayAgo } },
    { $mul: { price: 1 } }
  );

  await Pastry.updateMany(
    { toMarket: { $lt: twoDaysAgo, $gte: oneDayAgo } },
    { $mul: { price: 0.5 } }
  );

  await Pastry.updateMany(
    { toMarket: { $lt: threeDaysAgo, $gte: twoDaysAgo } },
    { $mul: { price: 0.2 } }
  );

  await Pastry.deleteMany({
    toMarket: { $lt: threeDaysAgo, $gte: twoDaysAgo },
  });
};

const task = new cron.CronJob('0 0 * * *', updatePrice);
task.start();