import db from '../models/index.js';

export const purchaseSpare = async (req, res) => {
  const { partId, quantity } = req.body;
  const buyerId = req.user.id; // From JWT [1]

  const t = await db.sequelize.transaction();

  try {
    // 1. Concurrency Control: Lock the part row [1]
    const part = await db.Part.findOne({
      where: { id: partId },
      lock: true,
      transaction: t
    });

    if (!part || part.stock < quantity) {
      throw new Error('Insufficient stock or item not found.');
    }

    // 2. Simulated UPI Handshake
    // Logic: Debit funds and log transaction reference [1]
    console.log(`Processing UPI debit for Part: ${part.name} (Qty: ${quantity})`);

    // 3. Update Inventory (Digital Twin Sync) [1]
    await part.decrement('stock', { by: quantity, transaction: t });

    // 4. Create Order Entry
    const order = await db.sequelize.query(
      `INSERT INTO "Orders" (id, "partId", "buyerId", quantity, total, status) 
       VALUES (gen_random_uuid(), :partId, :buyerId, :quantity, :total, 'COMPLETED') RETURNING *`,
      { replacements: { partId, buyerId, quantity, total: part.price * quantity }, transaction: t }
    );

    await t.commit();
    res.json({ message: 'Purchase successful! Local pickup code generated.', order: order });
  } catch (err) {
    await t.rollback();
    res.status(400).json({ error: err.message });
  }
};