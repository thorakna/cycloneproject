import React, { useEffect, useState } from 'react';

export default function Modal({mState, children}) {
    const [show, setShow] = useState(mState.iShow);

    useEffect(()=>{
        if (mState.iShow) setShow(true);
    },[mState]);

    const closeModal = () => {
        setShow(false);
    }

    const onAnimationEnd = () => {
        if (!show) mState.setiShow(false);
    };

    return (
        mState.iShow && (
        <div
            className="modal-container"
            style={{ animation: `${show ? "fadeIn" : "fadeOut"} 1s` }}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
            <button onClick={closeModal} className="cycloButton primaryColor">OK</button>
        </div>)
    );
}
