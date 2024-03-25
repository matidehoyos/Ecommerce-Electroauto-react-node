import axios from "axios"


const productosProvider = {

    
    async postProducto(producto) {
        try {
            const newProducto = await axios.post(`/productos`, producto)
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

    async getProductoById(id) {
        try {
            const producto = await axios.get(`/productos/${id}`)
            return producto.data
        } catch (error) {
            return error.message
        }
    },

    async getProductoByName(name) {
        try {
            const getProducto = await axios.get(`/productos/name/${name}`)
            return getProducto.data
        } catch (error) {
            return error.message
        }
    },
    
    async getProductoByCategory(category) {
        try {
            const getProducto = await axios.get(`/productos/category/${category}`)
            return getProducto.data
        } catch (error) {
            return error.message
        }
    },

    async putProducto(info) {
        try {
            const producto = await axios.put(`/productos`, info)
            return producto.data
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

export default productosProvider