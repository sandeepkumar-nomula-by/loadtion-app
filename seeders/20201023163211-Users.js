"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Sandeep",
          age: 29,
          password: "sasdbasjvhagsfasvf",
          email: "sandykumar.nomula@gmail.com",
        },
        {
          name: "Suresh",
          age: 23,
          password: "sasdbasjvhagsfasvf",
          email: "suresh.nomula@gmail.com",
        },
      ],
      {}
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
