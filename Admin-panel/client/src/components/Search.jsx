import { CiSearch } from "react-icons/ci";

function Search({ value, onChange, isLoading = false }) {
  return (
    <div className="flex items-center gap-4 ">
    <CiSearch size={28} />
    <input className="outline-none focus:outline-none focus:ring-0"  type="text" placeholder={isLoading ? "در حال جستجو..." : "جستجو کالا"} value={value} onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
}
export default Search;