const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized. No token.' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate('reportsTo', 'name role site');
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User not found or inactive.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired.' });
  }
};

// Role-based access
const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Insufficient permissions.' });
  }
  next();
};

// Build site/user filter based on role
const buildSiteFilter = (user, ownerSiteOverride = null) => {
  if (user.role === 'owner') {
    return ownerSiteOverride ? { site: ownerSiteOverride } : {};
  }
  if (user.role === 'site_head') {
    return { site: user.site };
  }
  // For closing_manager and sales_exec, need visible user IDs
  return { site: user.site };
};

// Get visible user IDs for a given user
const getVisibleUserIds = async (user) => {
  const User = require('../models/User');
  if (user.role === 'owner') {
    const all = await User.find({ isActive: true }, '_id');
    return all.map(u => u._id);
  }
  if (user.role === 'site_head') {
    const siteUsers = await User.find({ site: user.site, isActive: true }, '_id');
    return siteUsers.map(u => u._id);
  }
  if (user.role === 'closing_manager') {
    const ses = await User.find({ reportsTo: user._id, isActive: true }, '_id');
    return [user._id, ...ses.map(u => u._id)];
  }
  return [user._id];
};

module.exports = { protect, requireRole, buildSiteFilter, getVisibleUserIds };