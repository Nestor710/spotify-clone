import { useEffect, useState } from "react";
import { Slider } from "../Slider";

const SongControl = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate)
        return () => {
            audio.current.removeEventListener('timeUpdate', handleTimeUpdate)
        }
    }, []);

    const handleTimeUpdate = () =>  setCurrentTime(audio.current.currentTime)

    const formatTime = time => {
        if (time == null) return `0:00`
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const duration = audio.current?.duration ?? 0

    return (
        <div className="flex flex-row items-center gap-x-3 text-xs">
            <span className="opacity-50">{formatTime(currentTime)}</span>
            <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={duration}
                background="white"
                min={0}
                className="min-w-[440px]"
                onValueChange={(value) => {
                    audio.current.currentTime = value
                }}
            />
            <span className="opacity-50">
                {duration ? formatTime(duration) : '00:00'}
            </span>
        </div>
    )
}

export default SongControl;