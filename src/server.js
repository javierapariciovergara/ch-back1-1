import express from "express";
import { productsRoutes } from "./routes/products.routes.js";
import { cartsRoutes } from "./routes/carts.routes.js";

const app = express();
const PORT = 5000;

// App Configuracion

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes); 

// App Listener

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});