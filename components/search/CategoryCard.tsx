

import React from 'react';
import { Link } from 'react-router-dom'; // This import is fine for v5

interface CategoryCardProps {
  name: string;
  color: string; // Tailwind background color class
  imageUrl: string;
  to?: string; // Optional navigation path
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, color, imageUrl, to }) => {
  const cardContent = (
    <div
      className={`relative aspect-square ${color} rounded-lg p-4 overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 w-full h-full flex flex-col justify-between`}
      role="button"
      tabIndex={to ? -1 : 0}
      aria-label={`Browse ${name}`}
    >
      <h3 className="text-white text-xl md:text-2xl font-bold break-words">
        {name}
      </h3>
      <img
        src={imageUrl}
        alt="" // Decorative image
        className="absolute bottom-0 right-0 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 transform rotate-[25deg] translate-x-4 translate-y-2 group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );

  if (to) {
    return (
      <Link to={to} aria-label={`Browse ${name}`} className="block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-lg">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default CategoryCard;
