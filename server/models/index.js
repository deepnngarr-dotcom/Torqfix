import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import config
import configData from '../config/config.json' with { type: 'json' };
const env = process.env.NODE_ENV || 'development';
const config = configData[env];

const db = {};

// 🚀 3. Initialize Sequelize with Production Priority
let sequelize;
if (process.env.DATABASE_URL) {
  // Production Handshake (Render/Cloud)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // 🔒 Required for Render SSL connections
      }
    },
    logging: false
  });
} else {
  // Local Farmhouse Development
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 4. Read and import all model files
const files = fs.readdirSync(__dirname).filter(file => 
  file !== 'index.js' && file.endsWith('.js')
);

for (const file of files) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// 5. Handle Associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;