import db from '../models/index.js';

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Fetch All Transactions (Pending + Active) from the Booking table
    // This includes both 'RENTAL' and 'PURCHASE' types
    const subscriptions = await db.Booking.findAll({
      where: { userId: userId },
      include: [{ 
        model: db.Part, 
        as: 'tool', 
        attributes: ['name', 'category', 'technical_specs'] 
      }],
      order: [['createdAt', 'DESC']]
    });

    // 2. 🚀 REMOVED: The broken "Orders" raw SQL query
    // We return an empty array for orderHistory to keep the frontend from crashing
    const orderHistory = [];

    // 3. Return the unified data
    res.json({ subscriptions, orderHistory });
  } catch (err) {
    console.error("❌ Dashboard Sync Error:", err.message);
    res.status(500).json({ error: "Failed to sync node subscriptions." });
  }
};