"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void; // Define explicitamente o tipo da função
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query.trim()); // Chama a função apenas se houver texto
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2 max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Buscar notícias..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress} // Permite pesquisar ao pressionar "Enter"
        className="w-full m-5 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
      />
      <Button onClick={handleSearch} aria-label="Buscar">
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchInput;

