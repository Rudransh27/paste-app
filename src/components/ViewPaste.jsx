import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {

  const {id}=useParams();
  const allPastes=useSelector((state)=> state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0];
  console.log(paste)
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-md mt-2 w-[65%] pl-4"
          type="text"
          placeholder="Enter Title Here"
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-4">
        <textarea className="rounded-md  min-w-[500px] p-4" value={paste.content} placeholder="Enter content here" rows={20} disabled>
        </textarea>
        
      </div>
    </div>
  )
}

export default ViewPaste