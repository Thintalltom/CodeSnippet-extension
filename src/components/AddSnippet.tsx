
import { MdCancel } from "react-icons/md";
import { items } from "../data/Data";
import LanguageSelect from "./selectibleComponent/LanguageSelect";
import { useSelector, useDispatch } from "react-redux";
import {
    setSelected,

    addPrompt,
    setTitle,
    setCode,
    setTags
} from "../redux/slice/SavedCode";
import type { RootState } from "../redux/store";
interface AddSnippetProps {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddSnippet = ({ setShowForm }: AddSnippetProps) => {
    const dispatch = useDispatch();
    const { selected,  title, code, tags } = useSelector(
        (state: RootState) => state.prompt
    );

    const id = Date.now().toString();

// console.log('prompt', prompt)
    const handleSave = (e: any) => {
        e.preventDefault();
        dispatch(addPrompt({
            id: id,
            title: title,
            code: code,
            tags: tags,
            selected: selected
        }));
        setTitle("");
        setCode("");
        setTags([]);
        setSelected("");
        setShowForm(false)
    };

    //   console.log('saved data', prompt)
    return (
        <div className="fixed top-0 left-0 font-nunito w-full h-full bg-black bg-opacity-50  flex justify-center items-center z-50">
            <div className="bg-white  p-6 rounded-[10px] flex min-w-[400px] flex-col gap-[20px] shadow-md relative w-fit">
                <div className="flex gap-[20px] justify-between items-center">
                    <h2 className="font-medium text-2xl">Add New Snippet </h2>
                    <button onClick={() => setShowForm(false)}> <MdCancel className="text-2xl" /></button>
                </div>
                <form className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px]">
                        <label htmlFor="title" className="font-medium text-md">Title</label>
                        <input type="text" id="title" value={title} className="border  border-gray-300 rounded-[10px] p-2" onChange={(e) => dispatch(setTitle(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label htmlFor="description" className="font-medium text-md">Code</label>
                        <textarea id="description" value={code} className="border border-gray-300 rounded-[10px] p-2" onChange={(e) => dispatch(setCode(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label htmlFor="code" className="font-medium text-md">Language</label>
                        {/* <textarea id="code" className="border border-gray-300 rounded-[10px] p-2" /> */}
                        <LanguageSelect options={items} selected={selected}
                            setSelected={(selected) => dispatch(setSelected(selected))}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label htmlFor="tags" className="font-medium text-md">Tags (commas seperated)</label>
                        <input type="text" value={tags.join(", ")} id="tags" className="border border-gray-300 rounded-[10px] p-2" placeholder="React, UseStateHooks" onChange={(e) => dispatch(setTags(e.target.value.split(",").map(tag => tag.trim())))} />
                    </div>
                    <div className="flex gap-[10px] justify-end">
                        <button className="border-[1px] px-[20px] py-[10px] rounded " onClick={() => setShowForm(false)}>Cancel</button>
                        <button className="bg-blue-700 text-white font-medium px-[20px] py-[10px] rounded" onClick={handleSave}>Add Snippet</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSnippet