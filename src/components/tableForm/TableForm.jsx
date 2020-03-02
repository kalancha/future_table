import React, { useState } from 'react'
import styles from './tableForm.module.css'

export default function TableForm(props) {


    const [id, setId] = useState('');
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const reg = {
        id: '^[0-9]+$',
        name: "^[A-Z'][a-zA-Z-' ]+$",
        phone: "^[(][0-9]{3}[)][0-9]{3}-[0-9]{4}",
        email: "^.+@.+[.].+$"
    }

    function change(e) {
        switch (e.target.name) {
            case 'id':
                setId(e.target.value)
                break
            case 'firstName':
                setName(e.target.value)
                break
            case 'lastName':
                setSurname(e.target.value)
                break
            case 'phone':
                setPhone(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            default:
                alert('error')
        }
    }

    function check() {
        if (id.match(reg.id) === null || name.match(reg.name) === null || surname.match(reg.name) === null || phone.match(reg.phone) === null || email.match(reg.email) === null) {
            return false
        }
        return true
    }

    function submit() {
        if (check()) {
            props.newEl(id, name, surname, email, phone);
        } else {
            alert('Неправильный формат данных')
        }
    }

    return (
        <div className={styles.form}>

            <button className={styles.close} onClick={() => props.toggle()} />
            <div className={styles.labels}>

                <label>
                    ID:
                <input onChange={(e) => change(e)} name="id" type="text" required />
                </label>
                <label>
                    firstName:
                <input onChange={(e) => change(e)} name="firstName" type="text" required />
                </label>
                <label>
                    lastName:
                <input onChange={(e) => change(e)} name="lastName" type="text" required />
                </label>
                <label>
                    Email:
                <input onChange={(e) => change(e)} type="email" name="email" required />
                </label>
                <label>
                    Phone:
                <input onChange={(e) => change(e)} name="phone" type="text" required />
                </label>


            </div>

            <div className={styles.submit}>
                <input type="submit" value="Добавить" onClick={submit} />
            </div>
        </div>
    )


}