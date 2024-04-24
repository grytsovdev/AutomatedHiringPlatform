'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookings = [];

    for (let i = 1; i < 50; i++) {
      const status = faker.helpers.arrayElement(['pending', 'rejected', 'canceled', 'completed']);
      const createdAt = faker.date.past();
      const availableLanguages = [
        'english',
        'french',
        'arabic',
        'german',
        'spanish',
        'italian',
        'ukrainian',
      ];

      const languages = [];
      while (languages.length < 3) {
        const language = availableLanguages[Math.floor(Math.random() * availableLanguages.length)];
        if (!languages.includes(language)) {
          languages.push(language);
        }
      }

      bookings.push({
        status,
        position: faker.person.jobTitle(),
        companyName: faker.company.name(),
        createdBy: faker.number.int({ min: 1, max: 19 }),
        experience: faker.number.int({ min: 1, max: 5 }),
        languages,
        education: faker.lorem.words(10),
        salary: faker.number.int({ min: 400, max: 1000 }),
        notes: faker.lorem.paragraphs(3),
        createdAt,
        updatedAt: new Date(),
      });
    }

    bookings.push({
      status: 'completed',
      position: faker.person.jobTitle(),
      companyName: faker.company.name(),
      createdBy: 23,
      experience: faker.number.int({ min: 1, max: 5 }),

      education: faker.lorem.words(10),
      salary: faker.number.int({ min: 400, max: 1000 }),
      notes: faker.lorem.paragraphs(3),
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    });

    await queryInterface.bulkInsert('Bookings', bookings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};
