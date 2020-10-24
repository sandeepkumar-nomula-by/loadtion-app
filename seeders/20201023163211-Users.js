"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "3000",
          name: "U1",
          age: 21,
          password: "luckyshine001",
          email: "u1@luckyshine.xyz",
        },
        {
          id: "3001",
          name: "U2",
          age: 51,
          password: "luckyshine002",
          email: "u2@luckyshine.xyz",
        },
        {
          id: "3002",
          name: "U3",
          age: 31,
          password: "luckyshine003",
          email: "u1@luckyshine.xyz",
        },
        {
          id: "3003",
          name: "U4",
          age: 18,
          password: "luckyshine004",
          email: "u2@luckyshine.xyz",
        },
        {
          id: "3004",
          name: "U5",
          age: 21,
          password: "luckyshine005",
          email: "u1@luckyshine.xyz",
        },
        {
          id: "3005",
          name: "U6",
          age: 35,
          password: "luckyshine006",
          email: "u2@luckyshine.xyz",
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
