import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';

// 1. Setup paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Import config using the new 'with' syntax (Required for Node v22+)
import configData from '../config/config.json' with { type: 'json' };

const env = process.env.NODE_ENV || 'development';
const config = configData[env];

// 3. Initialize Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

// 4. Read and import all model files
const files = fs.readdirSync(__dirname).filter(file => 
  file!== 'index.js' && file.endsWith('.js')
);

for (const file of files) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);
  
  // This supports the 'export default (sequelize, DataTypes) =>...' format
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// 5. Handle Associations (Foreign Keys)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    //db.Booking.belongsTo(db.Part, { foreignKey: 'toolId', as: 'tool' });
  }
});
{/*if (db.Booking && db.Part) {
  db.Booking.belongsTo(db.Part, { foreignKey: 'toolId', as: 'tool' });
  db.Part.hasMany(db.Booking, { foreignKey: 'toolId', as: 'bookings' });
}*/}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;