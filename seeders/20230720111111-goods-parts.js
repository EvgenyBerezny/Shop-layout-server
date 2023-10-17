/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { faker } = require('@faker-js/faker');

('use strict');

const goodsManufacturer = [
  'LG',
  'Bosch',
  'Toshiba',
  'Samsung',
  'Xiaomi',
  'Panasonic',
  'Siemens',
  'Sony',
  'Supra',
  'Philips',
];

const goodsPartsManufacturer = [
  'Hyundai',
  'LG',
  'Bosch',
  'Toshiba',
  'Samsung',
  'Xiaomi',
  'BBK',
  'Panasonic',
  'Siemens',
  'Sony',
  'Supra',
  'Philips',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'GoodsParts',
      [...Array(100)].map(() => ({
        goods_manufacturer:
          goodsManufacturer[
            Math.floor(Math.random() * goodsManufacturer.length)
          ],
        goods_parts_manufacturer:
          goodsPartsManufacturer[
            Math.floor(Math.random() * goodsPartsManufacturer.length)
          ],
        price: faker.string.numeric(4),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
        images: JSON.stringify(
          [...Array(7)].map(
            () =>
              `${faker.image.urlLoremFlickr({
                category: 'technics',
              })}?random=${faker.string.numeric(30)}`,
          ),
        ),
        vendor_code: faker.internet.password(),
        in_stock: faker.string.numeric(1),
        bestseller: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.string.numeric(3),
        compatibility: faker.lorem.sentence(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('GoodsParts', null, {});
  },
};
