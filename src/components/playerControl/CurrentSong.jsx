const CurrentSong = ({ image, title, artists }) => {
    const artistsString = artists?.join(", ");
    return (
        <div
            className={`
            flex items-center gap-5 relative
            overflow-hidden
            `}
        >
            <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title}/>
            </picture>
            
            <div className="flex flex-auto flex-col">
                <h4 className="text-white text-sm">{title}</h4>
                <span className="text-gray-500 text-xs">{artistsString}</span>
            </div>
        </div>
    )
}

export default CurrentSong;