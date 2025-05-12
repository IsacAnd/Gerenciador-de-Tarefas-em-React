import { useState } from "react";
import "../styles/searchtask.css";
import { Search } from "lucide-react";

function SearchTask({ onSearch, setSearchQuery }) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="search-container">
      <input
        value={searchInput}
        onChange={(e) => {
          const value = e.target.value;
          setSearchInput(value);
          onSearch(value);
          setSearchQuery(value);
        }}
        type="text"
        id="search-input"
        placeholder="Digite o título da tarefa aqui"
      />
      <Search id="search-icon" />
    </div>
  );
}

export default SearchTask;
