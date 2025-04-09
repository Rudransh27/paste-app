import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes=useSelector((state)=> state.paste.pastes)

  useEffect(()=>{
    if(pasteId){
      const paste=allPastes.find((p)=>p._id===pasteId)

      setTitle(paste.title)
      setValue(paste.content)
    }



  }, [pasteId])

  function createPaste(){
    const paste={
      title:title,
      content:value,
      _id:pasteId || Date.now().toString(20),
      createdAt:new Date().toISOString()
    }

    if(pasteId){

      dispatch(updateToPastes(paste));

    }else{
      dispatch(addToPastes(paste))
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }
  return (

    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-md mt-2 w-[65%] pl-4"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className="p-2 rounded-md mt-2">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-4">
        <textarea className="rounded-md  min-w-[500px] p-4" value={value} placeholder="Enter content here" onChange={(e)=>setValue(e.target.value)} rows={20}>
          
        </textarea>
        
      </div>
    </div>
  );
};

export default Home;
