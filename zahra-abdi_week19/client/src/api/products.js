import axiosInstance from "./axios";

const getProducts = async (page, limit, searchTerm) => {
  let url = `/products?page=${page}&limit=${limit}`;

  if (searchTerm && searchTerm.trim().length > 0) {
    url += `&name=${encodeURIComponent(searchTerm.trim())}`;
  }
  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message.includes("out of bounds")
    ) {
      return {
        totalProducts: 0,
        page: 1,
        limit,
        totalPages: 0,
        data: [],
      };
    }

    throw error;
  }
};





// const deleteProduct = async (id) => {
//     const res = await axiosInstance.delete(`/products/${id}`);
//     return res.data; 
//   };
// const deleteProduct = async (id) => {
//   const res = await axiosInstance.delete(`/products/${id}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
//   return res.data;
// };
const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};



  
  const deleteProductsByIds = async (ids) => {
    const res = await axiosInstance.delete("/products", {
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`},
      data: { ids },
    });
    return res.data;
  };
  

  const updateProduct = async (product) => {
    const res = await axiosInstance.put(`/products/${product.id}`, product);
    return res.data;
  };
  
 
  const addProduct = async (product) => {
    const res = await axiosInstance.post("/products", product);
    return res.data; 
  };
  
  


export {getProducts, deleteProduct, updateProduct, addProduct, deleteProductsByIds}