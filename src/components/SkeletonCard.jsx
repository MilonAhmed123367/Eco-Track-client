import React from "react";

const SkeletonCard = () => {
  return (
    <div className="border rounded-lg overflow-hidden animate-pulse bg-gray-200">
      <div className="w-full h-40 bg-gray-300" />
      <div className="p-4 space-y-2">
        <div className="h-6 bg-gray-300 w-3/4"></div>
        <div className="h-4 bg-gray-300 w-1/2"></div>
        <div className="h-4 bg-gray-300 w-full"></div>
        <div className="h-4 bg-gray-300 w-full"></div>
        <div className="h-8 bg-gray-300 w-1/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
