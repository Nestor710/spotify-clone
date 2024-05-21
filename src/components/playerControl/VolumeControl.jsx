import { usePlayerStore } from "../../store/playerStore"
import { useRef } from "react"
import { Slider } from "../Slider"

const MinVolumeIcon = () => (
    <svg className="h-[16px] w-[16px]" role="presentation" aria-label="Volumen bajo"  aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" fill="white"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path></svg>
)

const MutedVolumeIcon = () => (
    <svg className="h-[16px] w-[16px]" role="presentation" aria-label="Volumen apagado" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" fill="white"><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
)

const MediumVolumeIcon = () => (
    <svg className="h-[16px] w-[16px]" role="presentation" aria-label="Volumen medio" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" fill="white"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path></svg>
)

const MaxVolumeIcon = () => (
    <svg className="h-[16px] w-[16px]" role="presentation" aria-label="Volumen alto" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" fill="white"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>
)


const VolumeControl = () => {
    const volume = usePlayerStore(state => state.volume)
    const setVolume = usePlayerStore(state => state.setVolume)
    const previusVolumeRef = useRef(volume)

    const handleVolumeButton = (audioVolume) => {
        if (audioVolume < 0.1) {
            setVolume(previusVolumeRef.current)
        } else {
            previusVolumeRef.current = volume;
            setVolume(0)
        }
    }

  return (
    <div className="flex justify-center gap-x-2">
        <button className="opacity-70 hover:opacity-100 transition-all" onClick={() => handleVolumeButton(volume)}>
           {
            volume > 0.70 ? <MaxVolumeIcon /> :
            volume < 0.25 && volume != 0 ? <MinVolumeIcon /> :
            volume > 0.24 ? <MediumVolumeIcon /> :
            volume == 0 ? <MutedVolumeIcon /> : null
           }
        </button>
        <Slider
            defaultValue={[100]}
            max={100}
            background="white"
            min={0}
            value={[volume * 100]}
            className="min-w-[90px]"
            onValueChange={(value) => {
                const [newVolume] = value
                const volumeValue = newVolume / 100;
                setVolume(volumeValue);
            }}
        />
    </div>
  )
}

export default VolumeControl;