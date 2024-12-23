import fs from "node:fs";
import { v4 as uuid } from "uuid";

// ProductsManager > Manejo de Crud de Productos
class ProductsManager {
    path;
    products = [];

    
    constructor( { path } ) {
        this.path = path;
            if (fs.existsSync(path)) {
                try {
                    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8")); 
                } catch (error) {
                    this.products = [];
            }
        } else {
            this.products = [];
        }
    };

    async getAll(){
        return this.products;
    };

    
    async getById({ id }){
        const product = this.products.find((product) => product.id === id);
        return product;
    }


    async create( { title, description, code, price, status, stock, category, thumbs } ){
        const id = uuid();
        
        const product = {
            id, title, description, code, price, status, stock, category, thumbs, 
        };

        this.products.push(product);

        try {
            await this.saveOnFile();
                return product;
            } catch (error) {
                console.error("Error al guardar el archivo");
            }
    };


    async update({ id, title, description, code, price, status, stock, category, thumbs } ){

        const product = this.products.find((product) => product.id === id);

        if (!product) {
            return null;
        }

        product.title = title ?? product.title;
        product.description = description ?? product.description;
        product.code = code ?? product.code;
        product.price = price ?? product.price;
        product.status = status ?? product.status;
        product.stock = stock ?? product.stock;
        product.category = category ?? product.category;
        product.thumbs = thumbs ?? product.thumbs;

        const index = this.products.findIndex((product) => product.id === id);

        this.products[index] = product;

        try {
            await this.saveOnFile();
                return product;
            } catch (error) {
                console.error("Error al actualizar el archivo");
            }

    };


    async delete({ id }){
        const product = this.products.find((product) => product.id === id);

        if (!product) {
            return null;
        };

        const index = this.products.findIndex((product) => product.id === id);
        
        this.products.splice(index, 1);

        try {
            await this.saveOnFile();
                return product;
            } catch (error) {
                console.error("Error al eliminar el archivo");
            }
    }


    
    async saveOnFile() {
        try {
            // (this.products, null, 2) > es el formateo del Json
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar el archivo", error.message);
        }
    }
};

// Exportar una instancia del servicio //
export const productsManager = new ProductsManager({
    path: "./src/db/products.json",
});