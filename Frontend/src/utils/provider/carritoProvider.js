import axios from "axios"


const carritoProvider = {

    
    async postProducto(producto) {
        try {
            const newProducto = await axios.post(`/carrito`, producto)
            return newProducto
        } catch (error) {
            return error.message
        }
    },
    
    async getProductos() {
        try {
            const productos = await axios(`/productos`)
            return productos
        } catch (error) {
            return error.message
        }
    },

    async deleteProducto(productId) {
        try {
            const producto = await axios.delete(`/productos/${productId}`)
            return producto;
        } catch (error) {
            return error.message
        }
    },

    async uploadImg(imgFile) {
        try {
            const url = `https://api.imgbb.com/1/upload?key=39742373eb01b1f677990f9eaf224ee2&name=${imgFile.name}`
            const data = new FormData();
            data.append("image", imgFile);
            const upload = await fetch(url, {
                method: "POST",
                body: data
            })
            const responseData = await upload.json()
            return responseData
        } catch (error) {
            return error.message
        }
    },
}

export default carritoProvider