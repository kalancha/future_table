import React, { useState } from 'react'
import styles from './otherOpp.module.css'


export default function OtherOpp(props) {

    const [show, setVisib] = useState(false)

    function setUrl(e) {
        props.setSize(e.target.value)
        e.target.value === 'big' ?
            props.url("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=0&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}") :
            props.url("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
    }

    return (
        <>
            {show ?
                <div className={styles.opp}>

                    <div className={styles.search}>
                        <input onChange={(e) => props.change(e.target.value)} type="text" className={styles.input} />
                        <input onClick={() => props.sub()} type="button" className={styles.searchBut} />
                    </div>

                    <button onClick={() => props.toggle()} className={styles.add}>Добавить запись</button>

                    <select className={styles.select} value={props.size} onChange={(e) => setUrl(e)}>
                        <option value="small">Маленький объем данных</option>
                        <option value="big">Большой объем данных</option>
                    </select>


                    <input type="button" onClick={() => setVisib(false)} className={styles.close} />
                </div>
                
                : <button className={styles.opt} onClick={(() => (setVisib(true)))}>Опции</button>
            }
        </>
    )
}