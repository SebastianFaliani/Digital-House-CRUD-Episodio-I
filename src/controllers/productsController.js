const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const writeJson = (products) => {
      fs.writeFileSync(productsFilePath, JSON.stringify(products), { encoding: "utf-8" });
};
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
      // Root - Show all products
      index: (req, res) => {
            res.render("products", { products, toThousand });
      },

      // Detail - Detail from one product
      detail: (req, res) => {
            let product = products.find((product) => product.id == req.params.id);
            res.render("detail", { product, toThousand });
      },

      // Create - Form to create
      create: (req, res) => {
            res.render("product-create-form", { products, toThousand });
      },

      // Create -  Method to store
      store: (req, res) => {
            let lastId = products[products.length - 1].id;
            let newProduct = {
                  id: lastId + 1,
                  name: req.body.name,
                  price: req.body.price,
                  discount: req.body.discount,
                  catergory: req.body.catergory,
                  description: req.body.description,
                  image: "default-image.png",
            };
            products.push(newProduct);
            writeJson(products);
            res.redirect("/products/");
      },

      // Update - Form to edit
      edit: (req, res) => {
            // Do the magic
      },
      // Update - Method to update
      update: (req, res) => {
            // Do the magic
      },

      // Delete - Delete one product from DB
      destroy: (req, res) => {
            // Do the magic
      },
};

module.exports = controller;
