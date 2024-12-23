import { Router } from "express";
import { productsManager } from "../managers/prod.manager.js";

export const productsRoutes = Router();

// Routes - Endpoints //


// Get de todos los Productos
productsRoutes.get("/", async (req, res) => {
    const products = await productsManager.getAll();
    res.status(200).json(products);
});


// Get de Producto por ID
productsRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await productsManager.getById({ id });

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
});


// POST de Productos
productsRoutes.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbs } = req.body;

    try{
    const product = await productsManager.create({ title, description, code, price, status, stock, category, thumbs });
    res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// PUT de Producto
productsRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, status, stock, category, thumbs } = req.body;

    try {
    const product = await productsManager.update({ id, title, description, code, price, status, stock, category, thumbs });

    if (!product) {
    return res.status(404).json( { message: "Producto no encontrado" });
    }

    res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// DELETE de Producto
productsRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productsManager.delete({ id });
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json( {product} );
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
});