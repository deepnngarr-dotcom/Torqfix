export default (sequelize, DataTypes) => {
  const Part = sequelize.define('Part', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false }, 
    category: { 
      type: DataTypes.ENUM(
        'ROBOTICS', 
        'ELECTRONICS TESTING', 
        'ELECTRONICS', // 👈 Added
        'DRONE', 
        'MECHANICAL', 
        'ELECTRICAL', 
        'AUTOMOTIVE', 
        'PLUMBING',
        'GARDENING'    // 👈 Added
      ), 
      allowNull: false 
    },
    technical_specs: { type: DataTypes.JSONB, defaultValue: {} },
    selling_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true }, 
    daily_rate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.ENUM('AVAILABLE', 'REQUESTED', 'ACTIVE', 'RETURNED'), defaultValue: 'AVAILABLE' },
    vendorId: { 
        type: DataTypes.UUID, 
        references: { model: 'Users', key: 'id' } 
      },
    renterId: { 
        type: DataTypes.UUID, 
        allowNull: true,
        references: { model: 'Users', key: 'id' } 
      },
    location: { type: DataTypes.GEOMETRY('POINT', 4326), allowNull: false } 
  });

  // 🚀 AUTOMATED ASSOCIATIONS: Called by index.js
  Part.associate = (models) => {
    // The owner of the asset (Noida Vendor)
    Part.belongsTo(models.User, { foreignKey: 'vendorId', as: 'owner' });

    // The current active user of the asset
    Part.belongsTo(models.User, { foreignKey: 'renterId', as: 'renter' }); 

    // Links the asset to its subscription history
    Part.hasMany(models.Booking, { foreignKey: 'toolId', as: 'bookings' });
  };

  return Part;
};