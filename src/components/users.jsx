import React, {useState} from "react"
// import api from "../api"
import "bootstrap/dist/css/bootstrap.css"
import { fetchAll } from "../api/fake.api/user.api"


const Users=()=>{

    const [users, setUsers] = useState(fetchAll())

    // Обработка события нажатия кнопки delete
    const handleDelete = (userId) => {
        
    }

    // Вывод правильного склонения фразы
    const renderPhrase = (number) => {
        const count = String(number).length
        let phrase = "человек"
        if ([2,3,4].includes(number)) {
           phrase = "человека"
        }
        return phrase
    }

    // Вывод фразы в заголовке
    const titlePhrase = () => {
        return (
            <div className="badge bg-primary m-2 p-2 fs-4">
                {users.length} {renderPhrase(users.length)} тусанет с тобой сегодня
            </div>
        )
    }
	const styleDiv = {
		display: 'inline-block'
	}
    return(
        <>
        {titlePhrase()}
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Имя</th>
					<th scope="col">Качества</th>
					<th scope="col">Профессия</th>
					<th scope="col">Встретился, раз</th>
					<th scope="col">Оценка</th>
				</tr>
			</thead>
			<tbody>
				{
					users.map((user, index) => 
					<tr key={index}>
						<th scope="row">{user.name}</th>
						<td>
							{
							user.qualities.map((item, index) => (
								<>
								<div key = {item["_id"]} style={styleDiv} className={item["color"]}>{item["name"]}</div>
								</>
							))
							}
						</td>
					</tr>
					)
				}
			</tbody>
		</table>
        </>
    )
}

export default Users