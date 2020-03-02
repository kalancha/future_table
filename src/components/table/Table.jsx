import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useHttp } from '../../hooks/http.hook'

import styles from './table.module.css'

import Pagination from '../pagination/Pagination'
import AddInfo from '../addInfo/AddInfo'
import ToggleSort from '../toggleSort/ToggleSort'
import OtherOpp from '../otherOpp/OtherOpp'
import Loader from '../loader/Loader'
import TableForm from '../tableForm/TableForm'

export default function Table() {

    const { request, loading, error } = useHttp()
    const [unTouchData, setUntouchData] = useState([])
    const [initData, setInitData] = useState([])
    const [info, updateInfo] = useState([])

    const [addinfo, updateAddInfo] = useState(false)
    const [form, visibForm] = useState(false)

    const [searchBox, setSearchBox] = useState('')
    const [page, setPage] = useState(1)

    const [size, setSize] = useState('small')
    const [url, changeUrl] = useState("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")

    const scroll = useRef();

    const fetchUniversities = useCallback(async () => {
        try {
            const data = await request(url)
            updateAddInfo(false)
            setInitData(data)
            setUntouchData(data)
        } catch (error) {
            alert("Ошибка")
        }
    }, [request, url]);

    useEffect(() => {
        fetchUniversities();
    }, [fetchUniversities]);

    useEffect(() => {
        if (addinfo) scrollDown()
    }, [addinfo]);

    useEffect(() => {
        updateInfo(initData.slice(0, 50))
    }, [initData])

    function sort(opt, way) {
        let newarr;
        if (opt === 'id') {
            newarr = [].concat(initData).sort((a, b) => (a[opt] - b[opt]))
            if (way === -1) newarr = newarr.reverse()
            if (way === 0) newarr = unTouchData
        }
        else {
            newarr = [].concat(initData).sort(function (a, b) {
                if (a[opt].toLowerCase() > b[opt].toLowerCase()) return 1
                if (a[opt].toLowerCase() < b[opt].toLowerCase()) return -1
                return 0
            })
            if (way === -1) newarr = newarr.reverse()
            if (way === 0) newarr = unTouchData
        }
        setPage(1)
        setInitData(newarr)
    }

    function search() {
        const search = unTouchData.filter(function (item) {
            for (let value of Object.keys(item)) {
                if (String(item[value]).includes(searchBox)) return true
            }
            return false
        });

        if (searchBox.trim() !== '') {
            setInitData(search)
        } else {
            setInitData(unTouchData)
        }
    }

    function newEl(...args) {
        let [id, name, surname, email, phone] = args
        let obj = { id: id, firstName: name, lastName: surname, email: email, phone: phone }
        let mas = [].concat(initData)
        mas.unshift(obj)

        setInitData(mas)
        setUntouchData(mas)
    }


    function scrollDown() {
        scroll.current.scrollIntoView({ alignToTop: false, behavior: "smooth" })
    }

    function turnPage(page) {
        setPage(page)
        updateInfo([].concat(initData).slice(page * 50, (page + 1) * 50))
    }



    return (
        <>
            {!error && !loading &&
                <>
                    <OtherOpp setSize={(size) => setSize(size)} size={size} url={(url) => changeUrl(url)} change={(value) => setSearchBox(value)} sub={search} toggle={() => visibForm(true)} />
                    {form && <TableForm toggle={() => visibForm(false)} newEl={(...args) => newEl(...args)} />}
                    <div className={styles.table}>
                        <table className={styles.striped}>
                            <tbody>
                                <tr className={styles.tableTr}>
                                    <th><div className={styles.th}>ID <ToggleSort sort={(way) => sort('id', way)} /> </div></th>
                                    <th><div className={styles.th}>FirstName <ToggleSort sort={(way) => sort('firstName', way)} /></div></th>
                                    <th><div className={styles.th}>LastName <ToggleSort sort={(way) => sort('lastName', way)} /></div></th>
                                    <th><div className={styles.th}>Email <ToggleSort sort={(way) => sort('email', way)} /></div></th>
                                    <th><div className={styles.th}>Phone <ToggleSort sort={(way) => sort('phone', way)} /></div></th>
                                </tr>
                                {info.map((item, index) => (
                                    <tr key={index} onClick={() => updateAddInfo(item)}><td>{item.id}</td><td>{item.firstName}</td><td>{item.lastName}</td><td>{item.email}</td><td>{item.phone}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {addinfo && <div ref={scroll}><AddInfo data={addinfo} /></div>}
                    {initData.length > 50 && <Pagination page={page} turn={(page) => turnPage(page)} length={initData.length} />}
                </>
            }

            {loading && <Loader />}

            {error && <h1>Error</h1>}

        </>
    )
}