import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";

type Props ={
    onChange:(value:string)=> void;
    sortOptions:string;
}

const SORT_OPTIONS =[
    {
        label:"default",
        value:"default"
    },
    {
        label:"price low-to-high",
        value:"price ltoh"
    },
    {
        label:"price high-to-low",
        value:"price htol"
    },
]
const SortOptionDd = ({onChange , sortOptions}:Props) => {
    
const selectedLabel = SORT_OPTIONS.find((option)=>option.value === sortOptions)?.label || SORT_OPTIONS[0].label
  return (
   <DropdownMenu>
    <DropdownMenuTrigger className="cursor-pointer w-fit border-2 p-2 rounded-xl focus:outline-none">sort by: {selectedLabel}
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        {SORT_OPTIONS.map((option , index)=>(
            <DropdownMenuItem key={index} className="cursor-pointer"
            onClick={()=> onChange(option.value)}>
             {option.label}
            </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
   </DropdownMenu>
  )
}

export default SortOptionDd
