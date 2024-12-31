import { Link } from "react-router-dom";
import { product } from "@/type";
import Rating from "./Rating";

type Props = {
    product: product;
}
const SearchProduct = ({ product }: Props) => {
    return (
        <Link to={`/details/${product.id}`} className=" drop-shadow-lg bg-white rounded-t-xl gap-10 md:gap-0 sm:h-[300px] sm:w-[250px] h-[200px] w-full flex flex-row md:flex-col justify-around">
            <div className=" w-[50%] h-full md:w-full md:h-[50%] rounded-xl pb-3 mb-3 ">
                <img src={product.image} className=" w-full h-full object-contain " />
            </div>
            <div className="px-2 flex flex-col gap-1 w-[50%] md:w-full justify-center">
                <h6 className="text-slate-500 text-xs">{product.category}</h6>
                <h1 className="tracking-tighter font-semibold text-sm mb-2 truncate">{product.title}</h1>
                <Rating />
                <h1 className="text-xl font-semibold my-2">₹ {product.price}</h1>
            </div>
        </Link>
    )
}

export default SearchProduct
