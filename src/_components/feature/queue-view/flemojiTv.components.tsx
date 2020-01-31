import React, { useState, useEffect } from 'react';

const FlemojiTv: React.FC = () => {
    return (
        <div className="row">
            <div className="col-12 flemojiTV">
                <div className="col-12 tvContainer">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/iSgUMPHQEWw?controls=0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
            </div>
        </div>);
}

export { FlemojiTv };
