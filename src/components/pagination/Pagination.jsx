import React, { useState } from 'react'
import { useEffect } from 'react';

import styles from './pagination.module.css'

export default function Pagination(props) {

    const [masBut, setMasBut] = useState([])

    useEffect(() => {
        function rendBut() {

            let page = props.page
            let buttons = [];
            let pages = Math.ceil(props.length / 50)
            let visBut = Math.ceil(document.body.clientWidth / 200)

            if (visBut % 2 === 0) visBut += 1
            if (visBut > pages) visBut = pages

            let part = Math.ceil((visBut - 2) / 2);
            let k = 0;

            if ((page > part - 1) && (visBut !== pages)) {
                buttons.push(<button key="toBegin" className={styles.begin} onClick={() => props.turn(0)}>В начало</button>)
                if (page + part < pages - 1) {
                    let koef = part
                    k = page - koef + 1
                } else {
                    k = pages - visBut
                }
            }
            
            for (let i = 0; i < visBut - 2; i++) {
                let elem = <button key={i + k} onClick={() => props.turn(i + k)}>{i + k + 1}</button>
                buttons.push(elem)
            }

            if (page + part < pages - 2) {
                buttons.push(<button key="SrAref" onClick={() => props.turn(Math.ceil((pages + page + part) / 2))} >...</button>)
            } else {
                buttons.push(<button key={pages - 2} onClick={() => props.turn(pages - 2)}>{pages - 1}</button>)
            }

            buttons.push(<button key={pages - 1} onClick={() => props.turn(pages - 1)}>{pages}</button>)
            setMasBut(buttons)
        }
        rendBut();

    }, [props])


    return (<div className={styles.pagination}>{masBut}</div>)

}