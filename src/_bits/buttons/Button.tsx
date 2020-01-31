import React, { useState, useEffect } from 'react';

const Button: React.FC = () => {
    const [loadingState, setLoadingState] = useState(false)
    useEffect(() => {

    })

    return (
        <div className="mmButton">
            <p>Buttom</p>
        </div>
    )
}

export { Button };