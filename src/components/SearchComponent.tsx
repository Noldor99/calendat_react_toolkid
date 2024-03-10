import { useTypedDispatch } from "@/hook/useTypedDispatch"
import { useTypedSelector } from "@/hook/useTypedSelector"
import { cn } from "@/lib/utils"
import { IconSearch } from "@tabler/icons-react"

const SearchComponent = () => {
  const { setSearchText } = useTypedDispatch()
  const searchText = useTypedSelector((state) => state.filter.searchText)

  const handleSearch = (e: any) => {
    const text = e.target.value
    setSearchText(text)
  }

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-start",
        "border-b-2 border-l border-r-2 border-t border-black"
      )}
    >
      <IconSearch className="mx-2" />
      <input
        className={cn(
          "px-3 py-1 mt-0 w-full",
          "border-none outline-none bg-transparent"
        )}
        type="text"
        placeholder="Find"
        id="searchInput"
        value={searchText}
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchComponent
