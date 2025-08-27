import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { IoPricetags } from "react-icons/io5";
const TagFilter = () => {
      const { prompt } = useSelector(
            (state: RootState) => state.prompt
        );
   
    const getTags = () => {
        const tags = prompt.map((item) => item.tags);
        const uniqueTags = [...new Set(tags.flat())];
        return uniqueTags;
    }
     const tagss = getTags();
  return (
    <div className="flex flex-col gap-[20px]">
        <div className="flex gap-[10px] items-center"> <span><IoPricetags /></span> <p className="font-medium text-[15px] text-[#374151]">Filter by tags:</p></div>
        <div className="flex gap-[10px] ">
            {tagss.map((tag, index) => (
                <button key={index} className="bg-[#F3F4F6] text-[11px] font-medium rounded-[20px] py-[10px] px-[20px]">
                    {tag}
                </button>
            ))}
        </div>

    </div>
  )
}

export default TagFilter