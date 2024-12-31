import { useSearchSingleProduct } from "@/api/api";
import Header from "@/components/Header";
import LoadingButton from "@/components/LoadingButton";
import Rating from "@/components/Rating";
import ShowError from "@/components/ShowError";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"

const DetailPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params;
    const { result, isLoading, isError } = useSearchSingleProduct(id!)
    if (isLoading) return <LoadingButton />
    if (isError) return <ShowError />
    if (!result || result.length === 0) return <span>No result found</span>;

    const handleclick = () => {
        navigate('/')
    }
    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="w-full md:w-[80%] mx-auto   h-full block md:flex ">
                <div className="bg-slate-400 h-10 mt-10 ml-10 cursor-pointer w-10 flex items-center justify-center rounded-full" onClick={handleclick}>
                    <ArrowBigLeft className="text-white" />
                </div>
                <div className="w-full md:w-[50%] b px-5 md:px-20">
                    <div className="h-[400px] mt-10 ">
                        <img src={result.image} alt="" className="object-contain h-full w-full" />
                    </div>
                </div>
                <div className="w-full md:w-[50%] h-full p-10  ">
                    <div className="flex flex-col gap-2 mb-5">
                        <h1 className="text-2xl font-light">{result.title}</h1>
                        <div className="w-full flex justify-between mt-5">
                            <h1 className="text-2xl font-light text-red-500  underline ">LIMITED STOCK</h1>
                            <Rating />
                        </div>
                    </div>
                    <Separator />
                    <div className="w-full h-[300px]">
                        <p className="mt-10">{result.description}</p>
                        <Button className="bg-slate-500 hover:bg-slate-600 text-white rounded-xl mt-5 h-8">{result.category}</Button>
                    </div>
                    <Button className="bg-red-500 text-white rounded-xl mt-5 w-full h-12">Add to Cart</Button>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
