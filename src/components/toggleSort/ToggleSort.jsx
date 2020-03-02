import React, { useState } from 'react'
import styles from './toggleSort.module.css'

export default function ToggleSort(props) {

    const [state, setState] = useState('neutral')
    function toggle() {
        if (state === 'neutral') {
            setState('up')
            props.sort(1);
        } else if (state === 'up') {
            setState('down')
            props.sort(-1);
        } else {
            setState('neutral')
            props.sort(0);
        }

    }
    return (
        <button className={[styles[state], styles.but].join(' ')} onClick={toggle}></button>
    )
}