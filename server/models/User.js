export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    // RBAC Roles from SCOPA Page 13
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: { 
      type: DataTypes.ENUM('admin', 'vendor', 'user'), 
      defaultValue: 'user' 
    },
    upi_id: { type: DataTypes.STRING }, // For the fund-locking mechanism
    location: { type: DataTypes.GEOMETRY('POINT', 4326) } // For proximity check
  });

  return User;
};

