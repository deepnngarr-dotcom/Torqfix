import db from './models/index.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const seedNoidaTech = async () => {
  try {
    console.log("🚀 Initializing Noida Deep Tech Node Injection...");

    const hashedPassword = await bcrypt.hash('noida123', 10);

    // 1. Specialized Vendor Registration
    const vendorData = [
      { name: "Testochem Technologies", email: "info@testochem.com", sector: "63" },
      { name: "Pantronics India Pvt Ltd", email: "sales@pantronics.com", sector: "67" },
      { name: "Vistar Technovation LLP", email: "support@vistartech.com", sector: "83" },
      { name: "IMTronics Technology", email: "admin@imtronics.com", sector: "63" },
      { name: "Tech On Electronics", email: "contact@techonelectronics.com", sector: "63" },
      { name: "SSSR Enterprises", email: "dealers@sssr.com", sector: "63" },
      { name: "Venture Control Systems", email: "ops@venturecontrol.com", sector: "63" },
      { name: "Elesa and Ganter India", email: "india@elesa-ganter.com", sector: "83" }
    ];

    const vendors = [];
    for (const v of vendorData) {
      const [user] = await db.User.findOrCreate({
        where: { email: v.email },
        defaults: {
          id: uuidv4(),
          name: v.name,
          password: hashedPassword,
          role: 'vendor'
        }
      });
      vendors.push(user);
    }

    // 2. Asset Mapping
    const techNodes = [
      // Testochem Technologies: Testing & Measuring (Sector 63)
      ...Array.from({ length: 5 }).map((_, i) => ({
        name: `High-Precision LCR Meter T-${i+100}`,
        category: 'ELECTRONICS TESTING', // 👈 New Category
        daily_rate: 1200 + (i * 200),
        selling_price: 85000 + (i * 5000),
        vendorId: vendors[0].id,
        technical_specs: { "Resolution": "0.01%", "Frequency": "100kHz", "Handshake": "AI-Verified" },
        location: { type: 'Point', coordinates: [77.3725 + (i * 0.0005), 28.6273] } 
      })),

      // IMTronics Technology: SMT & Prototyping (Sector 63)
      ...Array.from({ length: 5 }).map((_, i) => ({
        name: `SMT Pick & Place Machine P-${i+1}`,
        category: 'ROBOTICS',
        daily_rate: 4500,
        selling_price: 1250000, // Inside the ₹15L sweet spot
        vendorId: vendors[3].id,
        technical_specs: { "Placement_Rate": "4000CPH", "Precision": "±0.05mm" },
        location: { type: 'Point', coordinates: [77.3735, 28.6280 + (i * 0.0005)] }
      })),

      // Pantronics India: Testing Solutions (Sector 67)
      ...Array.from({ length: 5 }).map((_, i) => ({
        name: `Mixed Signal Oscilloscope MSO-X${i}`,
        category: 'ELECTRONICS TESTING',
        daily_rate: 2500,
        selling_price: 350000,
        vendorId: vendors[1].id,
        technical_specs: { "Bandwidth": "500MHz", "Channels": "4+16" },
        location: { type: 'Point', coordinates: [77.3800 + (i * 0.001), 28.6100] }
      })),

      // Tech On Electronics: EMS Gear (Sector 63)
      ...Array.from({ length: 5 }).map((_, i) => ({
        name: `Benchtop Reflow Oven RF-Eco`,
        category: 'ELECTRONICS TESTING',
        daily_rate: 1500,
        selling_price: 120000,
        vendorId: vendors[4].id,
        technical_specs: { "Zones": "3", "Temp_Range": "300C" },
        location: { type: 'Point', coordinates: [77.3710, 28.6260 + (i * 0.001)] }
      })),

      // Venture Control Systems: Motors & Drives (Sector 63)
      ...Array.from({ length: 5 }).map((_, i) => ({
        name: `Industrial AC Drive / VFD Node`,
        category: 'ELECTRICAL',
        daily_rate: 800,
        selling_price: 65000,
        vendorId: vendors[6].id,
        technical_specs: { "Power": "5.5kW", "Communication": "Modbus" },
        location: { type: 'Point', coordinates: [77.3750 + (i * 0.0015), 28.6290] }
      }))
    ];

    // 3. Global Network Broadcast
    await db.Part.bulkCreate(techNodes);
    console.log("✅ Deep Tech Nodes successfully deployed to Sectors 63, 67, and 83.");
    process.exit();
  } catch (err) {
    console.error("❌ Deep Tech Seeding Failed:", err.message);
    process.exit(1);
  }
};

seedNoidaTech();