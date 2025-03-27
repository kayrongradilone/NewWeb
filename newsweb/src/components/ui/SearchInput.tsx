"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.trim());
  };

  return (
    <div className="flex items-center space-x-2 max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Buscar notícias..."
        value={query}
        onChange={handleChange}
        className="w-full m-5 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
      />
      <Button onClick={() => onSearch(query.trim())} aria-label="Buscar">
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchInput;

