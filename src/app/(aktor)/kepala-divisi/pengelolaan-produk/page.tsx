"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard"; // Sesuaikan dengan path komponen Anda
import { FaPlus } from "react-icons/fa";
import ProductFormModal from "@/components/ProductForm"; // Import the new modal component
import ConfirmationPopup from "@/components/ConfirmationPopUp";
import ProductDetailModal from "@/components/ProductDetailModal"; // Add a new component for product details

interface Product {
  id: string;
  name: string;
  price: number | string;
  dimensions: string;
  image: string | null;
  description: string;
}

const PengelolaanProduk: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: Date.now().toString(),
    name: "",
    price: 0,
    dimensions: "",
    image: "",
    description: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backend-umkm-riau.vercel.app/api/dokumentasi"
        );
        const data = await response.json();

        if (data.success) {
          // Map API data to Product interface
          const fetchedProducts = data.data.map((item: any) => ({
            id: item.id,
            name: item.jenis, // Assuming 'jenis' is equivalent to 'name'
            price: item.harga,
            dimensions: item.ukuran,
            image: item.foto || "https://via.placeholder.com/150", // Default image if null
            description: "Deskripsi produk", // Assuming there's no description in the API data
          }));
          setProducts(fetchedProducts);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setIsPopUpOpen(true);
    setIsEditing(false);
    setCurrentProduct({
      id: Date.now().toString(),
      name: "",
      price: 0,
      dimensions: "",
      image: "",
      description: "",
    });
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const formData = new FormData();
      formData.append("jenis", product.name); // Nama produk
      formData.append("ukuran", product.dimensions); // Ukuran produk
      formData.append("harga", product.price.toString()); // Harga produk
      if (imageFile) {
        const response = await fetch(imageFile); // Ambil blob dari URL file
        const blob = await response.blob();
        formData.append("foto", blob, "product-image.jpg"); // Tambahkan file gambar ke formData
      }

      const response = await fetch(
        `https://backend-umkm-riau.vercel.app/api/dokumentasi/${product.id}`,
        {
          method: "PUT",
          body: formData, // Gunakan FormData, bukan JSON
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData);

      // Jika respons berhasil, perbarui produk di state
      if (response.ok && responseData.success) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id
              ? { ...p, name: product.name, dimensions: product.dimensions, price: product.price, image: imageFile || p.image }
              : p
          )
        );
        alert("Produk berhasil diperbarui!");
      } else {
        console.error("Error updating product:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsPopUpOpen(false); // Tutup modal setelah simpan
      setImageFile(null); // Reset gambar
    }
  };




  const handleSaveProduct = (product: Product) => {
    if (isEditing) {
      handleUpdateProduct(product); // Jika editing, gunakan fungsi update
    } else {
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        image: imageFile || product.image, // Gambar dari URL lokal atau gambar produk
      };
      setProducts((prev) => [...prev, newProduct]);
      setIsPopUpOpen(false); // Tutup modal setelah simpan
      setImageFile(null); // Reset gambar
    }
  };




  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setIsPopUpOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        const response = await fetch(
          `https://backend-umkm-riau.vercel.app/api/dokumentasi/${productToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productToDelete.id)
          );
          setProductToDelete(null);
          setShowConfirmation(false);
        } else {
          console.error("Failed to delete product:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmation(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(URL.createObjectURL(file)); // Simpan URL lokal untuk preview
      setCurrentProduct({ ...currentProduct, image: file }); // Simpan file asli
    }
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleAddProduct}
        className="bg-primary shadow-xl border-primary w-full flex items-center justify-center font-semibold text-lg text-white px-4 py-3 rounded-lg mb-6 hover:bg-primary hover:bg-opacity-80 hover:scale-95 transition-all duration-200 ease-in-out"
      >
        <FaPlus />
        <span className="ml-2">Tambah Produk</span>
      </button>
      <div className="grid grid-cols-2 text-black md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) =>
          product && product.id ? (
            <div key={product.id} className="bg-foreground shadow-xl rounded-lg">
              <ProductCard
                {...product}
                onClick={() => handleViewProductDetails(product)}
              />
              <div className="flex space-x-2 pb-4 px-4 justify-center">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 w-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(product)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 w-full"
                >
                  Hapus
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>


      <ProductFormModal
        isOpen={isPopUpOpen}
        onClose={() => setIsPopUpOpen(false)}
        onSave={handleSaveProduct}
        product={currentProduct}
        imageFile={imageFile}
        onFileChange={handleFileChange}
        onInputChange={handleInputChange}
      />

      {showConfirmation && productToDelete && (
        <ConfirmationPopup
          title="Konfirmasi Penghapusan"
          message={`Apakah Anda yakin ingin menghapus ${productToDelete.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default PengelolaanProduk;
