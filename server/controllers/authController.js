import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

export const register = async (req, res) => {
  console.log("🚀 Registration Attempt Received:", req.body);
  try {
    const { name, email, password, role, upi_id } = req.body;
    
    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // Default to User as per SCOPA
      upi_id
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user ||!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Issue Stateless JWT [2]
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'torqfix_secret_key',
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};