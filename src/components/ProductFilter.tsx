import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";
import ReactSlider from 'react-slider';

type Props = {
    onCategoryChange: (categories: string[]) => void;
    selectedCategories: string[];
    onPriceChange: (priceRange: [number, number]) => void;
    priceRange: [number, number];
    isExpanded: boolean;
    onExpandedClick: () => void;
};

const ProductFilter = ({
    onCategoryChange,
    selectedCategories,
    onPriceChange,
    priceRange,
    isExpanded,
    onExpandedClick,
}: Props) => {
    const categoryList = [
        "jewelery",
        "men's clothing",
        "electronics",
        "women's clothing",];

    const handleCategoryReset = () => onCategoryChange([]);
    const handlePriceReset = () => onPriceChange([0, 10000]);

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCategory = event.target.value;
        const isChecked = event.target.checked;
        const newCategoryList = isChecked
            ? [...selectedCategories, clickedCategory]
            : selectedCategories.filter((category) => category !== clickedCategory);
        onCategoryChange(newCategoryList);
    };

    return (
        <div className="border-[1px] p-5 md:h-[60%] rounded-xl md:fixed md:top-[18%] md:w-[22%] md:min-w-[300px]">
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filters</div>
                <div
                    className="text-sm font-semibold cursor-pointer mb-2 underline text-blue-500"
                    onClick={() => {
                        handleCategoryReset();
                        handlePriceReset();
                    }}
                >
                    Reset filters
                </div>
            </div>
            <div className="mb-5">
                <div className="text-md font-semibold mb-5">Filter by Category</div>
                <div className="space-y-2 flex flex-col">
                    {categoryList
                        .slice(0, isExpanded ? categoryList.length : 7)
                        .map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            return (
                                <div key={category} className="flex">
                                    <Input
                                        className="hidden"
                                        type="checkbox"
                                        id={`category_${category}`}
                                        value={category}
                                        checked={isSelected}
                                        onChange={handleCategoryChange}
                                    />
                                    <Label
                                        htmlFor={`category_${category}`}
                                        className={`px-4 py-2 flex flex-1 items-center rounded-full cursor-pointer text-sm font-semibold ${isSelected
                                            ? "text-green-500 border border-green-600"
                                            : "border border-slate-300"
                                            }`}
                                    >
                                        {isSelected && <Check size={20} strokeWidth={3} />}
                                        {category}
                                    </Label>
                                </div>
                            );
                        })}
                </div>
                <Button
                    variant="link"
                    className="mt-4 flex-1"
                    onClick={onExpandedClick}
                >
                    {isExpanded ? (
                        <span className="flex items-center flex-row">
                            View less <ChevronUp />
                        </span>
                    ) : (
                        <span className="flex items-center flex-row">
                            View more <ChevronDown />
                        </span>
                    )}
                </Button>
            </div>

            <div className="mb-5">
                <div className="text-md font-semibold mb-3">Filter by Price Range</div>
                <div className="px-4 py-2">
                    <ReactSlider
                        min={0}
                        max={10000}
                        step={100}
                        value={priceRange}
                        onChange={(range) => {
                            if (Array.isArray(range)) {
                                onPriceChange([range[0], range[1]] as [number, number]);
                            }
                        }}
                        className="h-2 bg-gray-200 rounded-md"
                        thumbClassName="h-4 w-4 bg-purple-500 rounded-full"
                        trackClassName="h-2 bg-purple-300 rounded-md"
                    />
                    <div className="flex justify-between mt-2 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
