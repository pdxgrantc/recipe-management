import React from 'react'

export default function PhotoDisplay({ photoURLs }) {
    return (
        <div>
            {photoURLs.map((url, index) => (
                <img key={index} src={url} alt={`Recipe ${index}`} />
            ))}
        </div>
    )
}