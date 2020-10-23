"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Treasures", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      latitude: {
        type: Sequelize.FLOAT,
      },
      longitude: {
        type: Sequelize.FLOAT,
      },
      name: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Treasures");
  },
};
