import * as React from "react";
import { useState } from "react";
import '@fontsource/montserrat/400.css';
import '@fontsource/krona-one/400.css';
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const galleryImages = [
    // Food products
    { id: 5, src: "/Food/2.png", category: "food", title: "Food Packaging" },
    { id: 6, src: "/Food/3.png", category: "food", title: "Food Grade Materials" },
    { id: 7, src: "/Food/4.png", category: "food", title: "Safe Food Packaging" },
    { id: 8, src: "/Food/5.png", category: "food", title: "Food Protection" },
    { id: 9, src: "/Food/6.png", category: "food", title: "Food Storage" },
    { id: 10, src: "/Food/7.png", category: "food", title: "Food Preservation" },
    
    // VCI products
    { id: 11, src: "/VCI/VCI Kraft Paper (K101 A).png", category: "vci", title: "VCI Kraft Paper" },
    { id: 12, src: "/VCI/VCI PE strength fabric (K101 sf) 2.png", category: "vci", title: "VCI PE Laminated Paper" },
    { id: 13, src: "/VCI/VCI 3-Ply Paper (KP 301) 1.png", category: "vci", title: "VCI 3-Ply Paper" },
    { id: 14, src: "/VCI/VCI LDPE Film (K101 VCF) 1.png", category: "vci", title: "VCI LDPE Film" },
    { id: 15, src: "/VCI/laminated.png", category: "vci", title: "VCI HDPE Laminated Strength Fabric" },
    { id: 16, src: "/VCI/VCI MET PET Laminated Paper (K101 AMP) 1.png", category: "vci", title: "VCI MET PET Laminated Paper" },
    { id: 17, src: "/VCI/VCI 4-Ply Fabric (K104 PF) 1.png", category: "vci", title: "VCI 4-Ply Fabric" },
    { id: 18, src: "/VCI/VCI Shrink Film (K102 SF) 1.png", category: "vci", title: "VCI Shrink Film" },
    { id: 19, src: "/VCI/VCI Desiccant (K103 DC) 1.png", category: "vci", title: "VCI Desiccant" },
    { id: 20, src: "/VCI/VCI Masterbatch (K106 MB) 1.png", category: "vci", title: "VCI Masterbatch" },
    { id: 21, src: "/VCI/VCI Power Stretch Film (K107 PSF) 1.png", category: "vci", title: "VCI Power Stretch Film" },
    { id: 22, src: "/VCI/Industrial Wax Paper1 (IWP101) 1.png", category: "vci", title: "Industrial Wax Paper" },
    { id: 23, src: "/VCI/Alu Barrier Bags (K108 ABB) 1.png", category: "vci", title: "Alu Barrier Bags" },
    { id: 24, src: "/VCI/24.png", category: "vci", title: "VCI Eco Paper" },
  ];

  const categories = [
    { id: "all", label: "All Products" },
    { id: "food", label: "Food Packaging" },
    { id: "vci", label: "VCI Products" },
  ];

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-white py-12 md:py-16 px-4 md:px-6 lg:px-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 md:mb-4" style={{ fontFamily: 'Krona One, sans-serif' }}>
          Product Gallery
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
          Explore our comprehensive range of packaging solutions designed for sustainability, protection, and performance.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-black text-white shadow-lg scale-105"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-gray-100 aspect-square"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-semibold">{image.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
              <h3 className="text-white text-lg md:text-xl font-bold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
