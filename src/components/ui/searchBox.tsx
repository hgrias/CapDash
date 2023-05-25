import {
  useSearchBox,
  type UseSearchBoxProps,
} from "react-instantsearch-hooks-web";
import { Search, X } from "lucide-react";
import { Input } from "./input";
import { useCallback, type ChangeEvent, useState, useRef } from "react";

export const SearchBox = (props: UseSearchBoxProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const memoizedSearch = useCallback(
    (query: string, search: (value: string) => void) => {
      search(query);
    },
    []
  );

  const { refine, clear } = useSearchBox({
    ...props,
    queryHook: memoizedSearch,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    refine(event.target.value);
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    // Clear the text in the search box
    setInputValue("");
    // Clear the search results
    clear();
    // Keep the search bar active
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="group flex w-full items-center rounded-full border p-1">
      <div className="pl-1">
        <Search className="" height={18} width={18} />
      </div>
      <Input
        className="h-6 w-full rounded-full border-none"
        onChange={handleChange}
        placeholder="Search"
        value={inputValue}
        ref={inputRef}
      />
      {inputValue && (
        <div className="pr-1" onClick={handleClear}>
          <X height={18} width={18} />
        </div>
      )}
    </div>
  );
};
