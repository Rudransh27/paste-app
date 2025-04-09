import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {

  const pastes=useSelector((state)=>state.paste.pastes);
  const dispatch=useDispatch();
  const [searchTerm, setSearchTerm]=useState("");

  const filteredData=pastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(pastes)

  function handleDelete(pasteId){
     dispatch(removeFromPastes(pasteId));
  }

  function handleCopy(content){
    navigator.clipboard.writeText(content)
    toast.success("copy to clipboard")
  }

  function handleShare(){
    if (navigator.share) {
      // Web Share API (only available on supported browsers)
      navigator.share({
        title: 'My Shareable Content',
        text: 'Check out this content I want to share!',
        url: window.location.href, // or a specific URL
      }).then(() => {
        console.log('Successfully shared!');
      }).catch((error) => {
        console.log('Error sharing:', error);
      });
    } else {
      // Fallback if Web Share API is not supported
      console.log('Share API not supported');
      alert('Share feature is not supported in your browser.');
    }
  }
  return (
    <div>
      <input 
        className='p-2 rounded-md min-w-[600px] mt-5'
        type="text"
        placeholder='search here'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 && 
          
          filteredData.map(
            (paste)=>{
              return (
                <div className='border' key={paste?.id}>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>

                  <div className='flex flex-row gap-4 place-content-evenly' >
                    <button>
                      <NavLink
                       to={`/?pasteId=${paste?._id}`}
                      >
                        Edit
                      </NavLink>
                    </button>
                    <button>
                      <NavLink
                       to={`/pastes/${paste._id}`}
                      >
                        View
                      </NavLink>
                    </button>
                    <button onClick={() => handleDelete(paste._id)}>Delete</button>
                    <button onClick={() => handleCopy(paste.content)}>Copy</button>
                    <button onClick={handleShare}>Share</button>
                  </div>

                  <div>
                    {paste.createdAt}
                  </div>
                 
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste