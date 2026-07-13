import { Product } from "../data/products";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden 
                    border border-gray-700 
                    hover:border-blue-500 
                    transition-all">
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-square object-cover 
                   bg-gray-900"
      />

      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-semibold">
            {product.name}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.inStock 
              ? "bg-green-900 text-green-400" 
              : "bg-red-900 text-red-400"
          }`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Category */}
        <span className="text-xs bg-blue-900 text-blue-400 
                         px-2 py-1 rounded-full">
          {product.category}
        </span>

        {/* Description */}
        <p className="text-gray-400 text-sm mt-2">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-blue-400 font-bold text-lg">
            ${product.price}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-gray-300 text-sm">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-3 bg-blue-600 
                           text-white py-2 rounded-lg 
                           hover:bg-blue-700 
                           transition-all text-sm">
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}