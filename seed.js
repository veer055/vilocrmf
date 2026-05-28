const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {

  console.log('MongoDB Connected');

  // DELETE OLD OWNER
  await User.deleteOne({
    email: 'owner@propcrm.com'
  });

  // CREATE NEW OWNER
  const user = await User.create({
    name: 'Rajesh',
    email: 'owner@propcrm.com',
    password: 'demo123',
    role: 'owner',
    site: 'ALL'
  });

  console.log('User Created ✅');
  console.log(user);

  process.exit();

})
.catch(err => {
  console.log(err);
});