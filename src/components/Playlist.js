import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPlayingIndex, togglePlay } from '../utils/songSlice';

const Playlist = ({playList,onSelect,}) => {

 const dispatch=useDispatch();

const isPlaying=useSelector(store=>store.song.isPlaying);
const currentPlayingIndex = useSelector((store) => store.song.currentPlayingIndex);


const manageIndex=(index)=>{
    onSelect(index);
    dispatch(setCurrentPlayingIndex(index));
    dispatch(togglePlay());


}


  return (
    <div>
        <h2 className="text-3xl font-medium m-2 p-1">PlayList</h2>
        <ul>
        {
        playList.map((audio,index)=>(
            <li 
             className="m-2 p-2 list-disc"
              key={index} >
                {audio.name}
                <button 
                onClick={()=>manageIndex(index)}
                className='m-2 p-2 border border-purple-300 rounded-md'>
                  {currentPlayingIndex===index ? "Currently Playing":"Play"}
               </button>
                </li>
        ))}
        </ul>
    </div>
  )
}

export default Playlist;