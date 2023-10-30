const bcrypt = require('bcrypt')
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../connectionDB');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        
        defaultValue: "user"
    },
    createdAt: {
        type: DataTypes.DATE,
        default: Date.now,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

User.beforeCreate(async (user, options) => {
    console.log({user})
    console.log({options})

    const hashedPassword = await bcrypt.hash(user.password, 12) 
    user.password = hashedPassword;
});

User.prototype.correctPassword = async function (
    condidatePassword,
    userPassword
) {
    return await bcrypt.compare(condidatePassword, userPassword);
};

// check when user tries to log in,his password has been changed after log in or not
User.prototype.isChangedPassword = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
      const passwordTimeStamp = this.passwordChangedAt.getTime() / 1000;
      return passwordTimeStamp > JWTTimeStamp;
    }
    return false;
};


module.exports = User;