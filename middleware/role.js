const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'superadmin') {
      next();
    } else {
      res.status(401).json({ message: 'Not authorized as a super admin' });
    }
  };
  
  module.exports = { isSuperAdmin };
  