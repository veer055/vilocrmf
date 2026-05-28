const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const leadRoutes = require('./routes/leads');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const inventoryRoutes = require('./routes/inventory');

const siteRoutes = require('./routes/sites');

const meetingsRoutes = require('./routes/meetings');
const paymentRoutes = require('./routes/payments');
const authRoutes = require('./routes/auth');

const app = express();

// CONNECT MONGODB
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/leads', leadRoutes);
app.use('/api/meetings', meetingsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sites', siteRoutes);

app.use('/api/reminders', require('./routes/reminders'));
app.get('/', (req, res) => {
  res.send('Backend Running ✅');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});