import db from './models/index.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'; // Ensure passwords are usable for login

const seed = async () => {
  try {
    console.log("🚀 Initializing Global Node Injection...");

    // 1. Setup Vendors with usable passwords
    const hashedPassword = await bcrypt.hash('noida123', 10);
    const vendors = [
      { id: uuidv4(), name: "Noida Industrial Spares", email: "vendor1@torqfix.com", role: "vendor" },
      { id: uuidv4(), name: "Alpha Robotics Lab", email: "vendor2@torqfix.com", role: "vendor" },
      { id: uuidv4(), name: "Techzone Engineering", email: "vendor3@torqfix.com", role: "vendor" },
      { id: uuidv4(), name: "TorqFix In-House", email: "admin@torqfix.com", role: "admin" }
    ];

    for (const u of vendors) {
      await db.User.findOrCreate({
        where: { email: u.email },
        defaults: { ...u, password: hashedPassword }
      });
    }

    const [v1, v2, v3, admin] = await Promise.all(
      vendors.map(u => db.User.findOne({ where: { email: u.email } }))
    );

    // 2. Define 40 items using the Unified 'Part' Schema
    const tools = [
      // VENDOR 1: MECHANICAL (10 Items)
      ...Array.from({ length: 10 }).map((_, i) => ({
        name: `Industrial Compressor V${i+1}`, // 👈 FIXED: tool_name to name
        category: 'MECHANICAL',
        daily_rate: 1200 + (i * 100),
        selling_price: 45000 + (i * 1000),
        technical_specs: { "Pressure": "150 PSI", "Grade": "Industrial" },
        vendorId: v1.id, // 👈 FIXED: ownerId to vendorId
        location: { type: 'Point', coordinates: [77.3725 + (i * 0.001), 28.6273] } // Noida Sector 62
      })),

      // VENDOR 2: ROBOTICS (10 Items)
      ...Array.from({ length: 10 }).map((_, i) => ({
        name: `Servo Module X-${i}`,
        category: 'ROBOTICS',
        daily_rate: 500 + (i * 50),
        selling_price: 12000 + (i * 500),
        technical_specs: { "Voltage": "24V", "Torque": "15Nm" },
        vendorId: v2.id,
        location: { type: 'Point', coordinates: [77.3850, 28.6300 + (i * 0.001)] } // Sector 63
      })),

      // VENDOR 3: AUTOMOTIVE (10 Items)
      ...Array.from({ length: 10 }).map((_, i) => ({
        name: `Hydraulic Jack ${i+1}T`,
        category: 'AUTOMOTIVE',
        daily_rate: 800,
        selling_price: 25000,
        vendorId: v3.id,
        location: { type: 'Point', coordinates: [77.3685 - (i * 0.001), 28.6210] } // Near JSSATE
      })),

      // ADMIN: PREMIUM ASSETS (10 Items)
      ...Array.from({ length: 10 }).map((_, i) => ({
        name: `TorqFix Elite: Metal Printer M${i}`,
        category: 'MECHANICAL',
        daily_rate: 5000,
        selling_price: 250000,
        vendorId: admin.id,
        location: { type: 'Point', coordinates: [77.5040, 28.4744 + (i * 0.0005)] } // Greater Noida
      }))
    ];

    // 3. Bulk Create in the Part table
    await db.Part.bulkCreate(tools); 
    console.log("✅ 40 Global Nodes successfully broadcasted to the network.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();