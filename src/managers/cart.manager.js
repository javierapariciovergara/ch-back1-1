import fs from "node:fs";
import { v4 as uuid } from "uuid";


// CartsManager > Manejo de Crud de Carritos
class CartsManager {
    path;
    carts = [];

    constructor( { path } ) {
        this.path = path;
            if (fs.existsSync(path)) {
                try {
                    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8")); 
                } catch (error) {
                    this.carts = [];
                }
        } else {
            this.carts = [];
        }
    };

    // getAll(){}; No requerido

    async getById( cid ){
        const cart = this.carts.find((cart) => cart.id === cid);
        return cart;
    }

    async createCart() {
        const id = uuid();
    
        if (this.carts.some((cart) => cart.id === id)) {
            throw new Error("Ya existe un carrito con el ID:", id);
        }
    
        const newCart = { id, products: [] };
        this.carts.push(newCart);
    
        try {
            await this.saveOnFile();
            return newCart;
        } catch (error) {
            console.error("Error al crear un nuevo carrito:", error.message);
            throw new Error("No se pudo crear un nuevo carrito");
        }
    }   

    
    async addProdCart(cid, pid) {
        const cart = this.carts.find((cart) => cart.id === cid);
        if (!cart) {
            throw new Error("El carrito no fue encontrado");
        }
        const availProduct = cart.products.find((p) => p.product === pid);
        if (availProduct) {
            availProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        await this.saveOnFile();
        return cart;
    };

    ///////////////////////////// METODOS QUE FALTAN PONER AQUI

    async saveOnFile() {
        try {
            // (this.products, null, 2) > es el formateo del Json
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("Error al guardar el archivo:", error.message);
        }
    }    
};

// Exportar una instancia del servicio
export const cartsManager = new CartsManager({
path: './src/db/carts.json',
});