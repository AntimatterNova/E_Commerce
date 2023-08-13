const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const Product = require('./models/Product');
const Category = require('./models/Category');
const Tag = require('./models/Tag');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Defining associations
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: 'ProductTag',
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: 'ProductTag',
  foreignKey: 'tag_id',
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
