import React from 'react';

const FloatingButton = ({ icon, label, onClick, color = 'red' }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative p-4 bg-${color}-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
      title={label}
    >
      <span className="text-2xl">{icon}</span>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </button>
  );
};

export default FloatingButton;