'use client';

export default function CategorySelector({ selectedCategory, onCategoryChange }) {
  const categories = [
    "All Categories",
    "Employment Rights",
    "Housing & Tenant Rights",
    "Consumer Protection",
    "Women's Rights",
    "Senior Citizen Rights",
    "LGBTQ+ Rights",
    "SC/ST/OBC Rights",
    "Cyber Laws",
    "Marriage & Family Laws",
    "Criminal Law Basics",
    "RTI & Citizen Rights",
    "Property & Inheritance Laws",
    "Religious & Personal Laws",
    "Legal Aid & Procedure"
  ];

  return (
    <div className="bg-orange-100 p-4 rounded-lg shadow-sm b">
      <h2 className="text-lg font-semibold text-orange-800 mb-4">Legal Categories</h2>
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-orange-200 text-orange-800 font-medium'
                : 'hover:bg-orange-200 text-grey-700 hover:text-orange-800'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}