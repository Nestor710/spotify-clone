import { usePlayerStore } from '@/store/playerStore';
import { useEffect, useRef } from 'react';
import SongControl from './SongControl';
import VolumeControl from './VolumeControl';
import CurrentSong from './CurrentSong';

export const Pause = ({ className }) => (
    <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)

export const Play = ({ className }) => (
    <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
)

export function Player () {
    const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore( state => state )    
    const audioRef = useRef()

    useEffect(() => {
        isPlaying
        ? audioRef.current.play()
        : audioRef.current.pause()
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume]);
    
    useEffect(() => {
        const { song, playlist, songs } = currentMusic
        if (song) {
            const src = `/music/${playlist.id}/0${song.id}.mp3`;
            audioRef.current.src = src
            audioRef.current.volume = volume
            audioRef.current.play();
        }
    }, [currentMusic])

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    }

    return (
        <>
            { currentMusic.song &&
                <div className="flex flex-row justify-between w-full px-4 z-50">
                    <div className="w-[250px]">
                        {
                            currentMusic && 
                            <CurrentSong 
                                {...currentMusic.song}
                            />
                        }
                    </div>
                    <div className="grid place-content-center gap-4 flex-1">
                        <div className="flex justify-center items-center flex-col gap-y-4">
                            <button className="bg-white rounded-full p-2" onClick={() => handleClick(!isPlaying)}>
                                {isPlaying ? <Pause/> : <Play />}
                            </button>
                            <SongControl audio={audioRef}/>
                        </div>
                    </div>
                    <div className="grid place-content-center">
                        <VolumeControl />
                    </div>
                </div>
            }
            <audio ref={audioRef}/>
        </>
    )
}