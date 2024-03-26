import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  placeholder: string;
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  return (
    <div className="flex items-center gap-2.5 p-3 rounded-lg w-max bg-zinc-500">
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none outline-0"
      ></input>
    </div>
  );
};

export default Search;
