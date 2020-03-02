import React from 'react'
import styles from './addInfo.module.css'

export default function AddInfo(props) {
    return (
            <div className={styles.addInfo}>
                {props.data.address ?
                    <>
                        <p> Выбран пользователь <b>{props.data.firstName} {props.data.lastName}</b> </p>
                        <p>Описание:</p>
                        <textarea defaultValue={props.data.description} />
                        <p>Адрес проживания: <b>{props.data.address.streetAddress}</b></p>
                        <p>Город: <b>{props.data.address.city}</b></p>
                        <p>Провинция/штат: <b>{props.data.address.state}</b></p>
                        <p>Индекс: <b>{props.data.address.zip}</b></p>
                    </>
                    : <h1> Нет информации </h1>}
            </div>
    )
}