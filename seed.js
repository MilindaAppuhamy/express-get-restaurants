const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedMenu, seedItem } = require("./seedData");
const db = require("./db/connection");

const syncSeed = async () => {
  await db.sync({ force: true });
  await Restaurant.bulkCreate(seedRestaurant);
  await Menu.bulkCreate(seedMenu);
  await Item.bulkCreate(seedItem);
  populate();
};

const populate = async () => {
  const restaurant_one = await Restaurant.findByPk(1);
  const menu_one = await Menu.findByPk(1);
  const menu_two = await Menu.findByPk(2);
  const item_one = await Item.findByPk(1);
  const item_two = await Item.findByPk(2);
  const item_three = await Item.findByPk(3);
  await menu_one.setItems([item_one, item_two]);
  await menu_two.setItems([item_two, item_three]);
  await restaurant_one.setMenus(menu_one, menu_two);
};

syncSeed();
