const Activity = require('../models/Activity');
const User = require('../models/User');

module.exports = {
  createActivity: async function(activityObject) {
    const newActivity = await Activity.create(activityObject);
    return newActivity;
  },
  removeAllActivity: async function() {
    if (process.env.NODE_ENV === 'test') await Activity.deleteMany({});
  }
};
