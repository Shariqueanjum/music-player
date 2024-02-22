import { useEffect, useRef, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Playlist from "./components/Playlist";
import { useDispatch } from "react-redux";
import { setCurrentPlayingIndex } from "./utils/songSlice";


function App() {
  const [playList,setPlayList]=useState([]);
  const [currentAudioIndex,setCurrentAudioIndex]=useState(-1);
  const fileInputRef = useRef(null);
  const dispatch=useDispatch();

  const handleInputChange=(e)=>{
     const files=e.target.files;
     let newPlayList=[];
     if(playList!=null)newPlayList=[...playList]
     
     for(let i=0;i<files.length;i++){
      const file=files[i];
      const audioObject = {};
      console.log(file,"file ")

      const reader = new FileReader();

      reader.onload = (event) => {
        audioObject.name = file.name;
        audioObject.dataURL = event.target.result; // Store the Base64-encoded data
  
        newPlayList.push(audioObject);
        setPlayList(newPlayList);
      };

      reader.readAsDataURL(file);
    
     }
     
      

      

      if(fileInputRef.current){
        fileInputRef.current.value="";
      }

            
  }

const handleAudioSelect=(index)=>{
     setCurrentAudioIndex(index);
     dispatch(setCurrentPlayingIndex(index));
}

useEffect(() => {
  
  if (playList !== null && playList.length > 0) {
    // Save Base64-encoded data to local storage
    const playlistData = playList.map((audioObject) => ({
      name: audioObject.name,
      dataURL: audioObject.dataURL,
    }));
    localStorage.setItem("playlist", JSON.stringify(playlistData));
  }

 
 
  if(currentAudioIndex!==-1){
     localStorage.setItem('currentAudioIndex', JSON.stringify(currentAudioIndex));
  }

}, [playList, currentAudioIndex]);


useEffect(() => {
  const storedPlaylist = JSON.parse(localStorage.getItem("playlist"));
  console.log(storedPlaylist, "I am stored playList");

  if (storedPlaylist) {
    const decodedPlaylist = storedPlaylist.map((audioObject) => ({
      name: audioObject.name,
      dataURL: audioObject.dataURL,
    }));
    setPlayList(decodedPlaylist);
  }

  const storedIndex = JSON.parse(localStorage.getItem('currentAudioIndex'));
  setCurrentAudioIndex(storedIndex);

}, []);

 

  return (
    <div className="flex flex-row">
     <div className="m-3 p-2">
      <h2 className="text-2xl font-medium m-3 p-2">Music Player App</h2>
      <input className="outline-none border border-blue-400 rounded-lg w-[75%] p-1" 
      ref={fileInputRef}
      onChange={handleInputChange}
      
      type="file" accept=".mp3" multiple/>
       
      {playList!=null  &&
       <Playlist 
       playList={playList} 
       onSelect={handleAudioSelect}

       />}

       </div>
     {currentAudioIndex!=null &&
      <div className="border border-purple-400 rounded-xl m-4 p-3 w-[35%]">
        <h2 className="text-3xl font-medium p-2 ml-52">Now Playing </h2>

       { playList!=null && currentAudioIndex!==-1 &&
        <AudioPlayer 
          playList={playList}
          currentAudioIndex={currentAudioIndex}
          onSelect={handleAudioSelect}
         />
     }
     </div>
}

    </div>

  );
}

export default App;
