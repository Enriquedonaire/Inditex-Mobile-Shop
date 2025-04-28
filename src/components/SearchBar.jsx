import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search by brand or model..."
          value={searchTerm}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-card text-foreground placeholder:text-muted-foreground"
          aria-label="Search products"
        />
      </div>
    </div>
  );
}
