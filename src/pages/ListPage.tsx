import { useSearchProduct } from "@/api/api";
import Header from "@/components/Header";
import Searchbox, { SearchForm } from "@/components/Searchbox";
import SearchProduct from "@/components/SearchProduct";
import SortOptionDd from "@/components/SortOptionDd";
import ProductFilter from "@/components/ProductFilter";
import { product } from "@/type";
import { useMemo, useState } from "react";
import LoadingButton from "@/components/LoadingButton";
import ShowError from "@/components/ShowError";

export type SearchState = {
  searchQuery: string;
  selectedProduct: string[];
  sortOptions: string;
};

const ListPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    selectedProduct: [],
    sortOptions: "default",
  });


  const handleCategoryChange = (categories: string[]) => setSelectedCategories(categories);
  const handlePriceChange = (range: [number, number]) => setPriceRange(range);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const setSortOptions = (sortOptions: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOptions,
    }));
  };

  const resetSearch = () => {
    setSearchState({
      searchQuery: "",
      selectedProduct: [],
      sortOptions: "default",
    });
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
  };

  const { result, isLoading ,isError} = useSearchProduct();
  const sortedResult = useMemo(() => {
    if (!result || !Array.isArray(result)) return [];
    const filteredResults = result.filter((product: product) => {
      const matchesQuery =
        product.title.toLowerCase().includes(searchState.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchState.searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesQuery && matchesCategory && matchesPrice;
    });

    return filteredResults.sort((a, b) => {
      if (searchState.sortOptions === "price ltoh") return a.price - b.price;
      if (searchState.sortOptions === "price htol") return b.price - a.price;
      return 0;
    });
  }, [result, searchState, selectedCategories, priceRange]);

  if (isLoading) return <LoadingButton/>
  if(isError) return <ShowError/>
  if (!result || result.length === 0) return <span>No result found</span>;

  return (
    <div className="flex flex-col gap-10 ">
      <Header />
      <div className=" block md:flex gap-10 px-5">
        <div className=" w-full md:w-[24%] md:min-w-[300px] ">
          <ProductFilter
            onCategoryChange={handleCategoryChange}
            selectedCategories={selectedCategories}
            onPriceChange={handlePriceChange}
            priceRange={priceRange}
            isExpanded={isExpanded}
            onExpandedClick={toggleExpanded}
          />
        </div>
        <div id="main-content" className="flex flex-col gap-5 w-full md:w-[80%]">
          <Searchbox onSubmit={setSearchQuery} searchQuery={searchState.searchQuery} onReset={resetSearch} />

          <div className="flex mb-5 ml-2 flex-col gap-4 md:flex-row justify-between">
            <div className="text-xl font-semibold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
              <span>{sortedResult.length} result(s) found</span>
            </div>
            <SortOptionDd sortOptions={searchState.sortOptions} onChange={setSortOptions} />
          </div>

          <div className="flex flex-wrap gap-10">
            {sortedResult.map((product: product) => (
              <SearchProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
