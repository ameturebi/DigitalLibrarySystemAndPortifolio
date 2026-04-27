const supabase = require('../config/supabaseClient');

// @desc    Admin Login
// @route   POST /api/auth/login
const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1. Supabase checks the secure Auth system for this email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // 2. If valid -> return success with the logged-in token
    res.json({
      message: 'Login successful',
      token: data.session.access_token, // Safely pass the token
      user: data.user.email
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin };
