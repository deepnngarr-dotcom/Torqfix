import db from '../models/index.js';

export const getDisputedRentals = async (req, res) => {
  try {
    // Queries tools where the audit_flag was set to 'DAMAGED' by the return controller [1]
    const disputes = await db.Part.findAll({
      where: { 
        status: 'RETURNED',
        'condition_data.audit_flag': 'DAMAGED' 
      },
      include: [{ model: db.User, as: 'owner', attributes: ['name', 'email'] }]
    });
    res.json(disputes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resolveDispute = async (req, res) => {
  const { toolId, action } = req.body; // 'CAPTURE' or 'RELEASE'
  
  try {
    const tool = await db.Part.findByPk(toolId);
    
    if (action === 'CAPTURE') {
      // Simulate final UPI debit from blocked funds [1]
      console.log(`Finalizing capture of ₹${tool.daily_rate * 5} for damage.`);
    }

    await tool.update({ 
      status: 'AVAILABLE', 
      'condition_data.audit_flag': 'RESOLVED' 
    });
    
    res.json({ message: `Dispute ${action}D. Asset returned to pool.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};