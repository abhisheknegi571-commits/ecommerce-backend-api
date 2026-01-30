import { Product } from "../models/Product.js";

//add product
export const addProduct = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res.json({ message: "Product added successfully", product, success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get all products
export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    if (!products) return res.json({ message: "no products found" });
    res.json({
      message: "Products fetched successfully",
      products,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get product by id
export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findById(id);
    if (!product)
      return res.json({ message: "Invalid product id", success: false });
    res.json({ message: "Fetched specific product", product, success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//update product by id
export const updateProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product)
      return res.json({ message: "invalid product id", success: false });
    res.json({
      message: "Product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.messsage });
  }
};

//delete product by id
export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndDelete(id);
    if(!product) return res.json({
      message: "Invalid product id",
      success: false
    })
    res.json({
      message: "Product has been deleted succcessfully",
      success: true
    })
  } catch (error) {
    res.json({
      message: error.message
    })
  }
}
