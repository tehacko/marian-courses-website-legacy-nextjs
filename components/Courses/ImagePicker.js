'use client';

import { useRef } from 'react';

import classes from './ImagePicker.module.css';

export default function ImagePicker({label, name}) {
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
}

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <input 
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png"
                    name={name}
                    ref={imageInput}
                />
                <button 
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}>
                    Vyber obrázek
                </button>
            </div>
        </div>
    );
}