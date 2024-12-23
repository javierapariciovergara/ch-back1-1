import { Router } from "express";
import { cartsManager } from "../managers/cart.manager.js";

export const cartsRoutes = Router();

// Routes - Endpoints //

// Get Carrito por ID
//// Mejorar
cartsRoutes.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsManager.getById(cid);
        if (!cart) {
            return res.status(404).json({ message: "El carrito no fue encontrado" });
        }res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el carrito" });
    }
});


// Post Nuevo Carrito
cartsRoutes.post("/", async (req, res) => {
    try {
        const newCart = await cartsManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el carrito" });
    }
});


// Post Producto en Carrito
cartsRoutes.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const updatedCart = await cartsManager.addProdCart(cid, pid);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});