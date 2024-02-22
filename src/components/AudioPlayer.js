import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeIsPlayingFalse, setCurrentPlayingIndex, togglePlay } from '../utils/songSlice';

const AudioPlayer = ({ playList, currentAudioIndex, onSelect }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((store) => store.song.isPlaying);
  const audio = new Audio();

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (currentAudioIndex === playList.length - 1) {
        dispatch(makeIsPlayingFalse());
      } else {
        if (currentAudioIndex < playList.length - 1) onSelect(currentAudioIndex + 1);
      }
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playList, currentAudioIndex, dispatch, onSelect]);

  useEffect(() => {
    const audio = audioRef.current;

    if (currentAudioIndex !== null && currentAudioIndex < playList.length) {
      audio.src = playList[currentAudioIndex].dataURL;
    }

    if (isPlaying) {
      audio.play().catch((err) => {
        console.log("error message", err.message);
      });
    }

    return () => {
    
    };
  }, [playList, currentAudioIndex, isPlaying]);

  const handlePlay = () => {
    if (isPlaying) {
        audio.pause();
        dispatch(makeIsPlayingFalse());
        
    } else {
        audio.play().catch((err) => {
            console.error('Error playing audio:', err);
            
        });
        dispatch(togglePlay());
        
    }
};


  if (currentAudioIndex === null) return null;

  return (
    <div>
      <h2 className="overflow-x-auto font-xl m-2 p-2">
        {currentAudioIndex !== null && currentAudioIndex < playList.length && playList[currentAudioIndex].name}
      </h2>

      <audio controls ref={audioRef} />

      <button className="border border-purple-300 rounded-lg m-2 p-3" onClick={handlePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;
