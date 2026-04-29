export default (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('RENTAL', 'PURCHASE'),
      allowNull: false,
      defaultValue: 'RENTAL'
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED'),
      defaultValue: 'PENDING'
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    payment_status: {
      type: DataTypes.ENUM('UNPAID', 'PAID', 'REFUNDED'),
      defaultValue: 'UNPAID'
    },
    handover_details: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  });

// 🚀 AUTOMATED ASSOCIATIONS: Called by index.js
  Booking.associate = (models) => {
    // Links the transaction to the Startup Engineer
    Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    
    // Links the transaction to the Technical Node
    // Alias 'tool' must match the 'as: tool' in your dashboard controller
    Booking.belongsTo(models.Part, { foreignKey: 'toolId', as: 'tool' });
  };

  return Booking;
};