"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Treasures",
      [
        {
          id: 1,
          latitude: 17.333042,
          longitude: 78.529312,
          name: "Sandeep",
        },
        {
          id: 2,
          latitude: 17.38544,
          longitude: 68.529312,
          name: "Suresh",
        },
      ],
      {},
      {
        id: {
          autoIncrement: true,
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
