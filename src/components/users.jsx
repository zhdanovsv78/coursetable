import React, {useState} from "react"
// import api from "../api"
import "bootstrap/dist/css/bootstrap.css"
import api from "../api/index"


const Users=()=>{

    const [users, setUsers] = useState(api.users.fetchAll())
	
	const styleDiv = {
		display: 'inline-block'
	}
	const stylePhrase = {
		fontFamily: 'sans-serif',
		fontWeight: 500
	}
    // Обработка события нажатия кнопки delete
    const handleDelete = (userId) => {
        setUsers(users.filter(user=>user._id!==userId))
    }

	const resetTable = () => {
		
		users.setState({
			user: [{}]
		  });
	}

    // Вывод правильного склонения фразы
    const renderPhrase = (number) => {
        const phrase=([2,3,4].includes(number))?"человека":"человек"
        return phrase
    }

    // Вывод фразы в заголовке
    const titlePhrase = () => {
		const res = (users.length===0?"Никто с тобой не тусанет сегодня":(users.length+" "+renderPhrase(users.length)+" тусанет с тобой сегодня"))
		return res
    }
	
    return(
        <>

		<div className={"badge m-1 p-1 fs-5 bg-"+(users.length>0?"primary":"danger")} style={stylePhrase}>
			{titlePhrase()}
		</div>
        
		{users.length>0&&
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Имя</th>
					<th scope="col">Качества</th>
					<th scope="col">Профессия</th>
					<th scope="col">Встретился, раз</th>
					<th scope="col">Оценка</th>
					<th scope="col"></th>
				</tr>
			</thead>

			<tbody>
				{
					users.map((user) => 
						<tr key={user._id}>
							{/* Имя */}
							<th scope="row">{user.name}</th>

							{/* Качества */}
							<td>
								{
								user.qualities.map((item) => (
									<div key = {item._id} style={styleDiv} className={`badge bg-${item.color} m-1`}>{item.name}</div>
								))
								}
							</td>
							{/* Профессия */}
							<td>
								{
								<div>{user.profession.name}</div>
								}
							</td>
							{/* Встретился, раз */}
							<td>
								{
								<div>{user.completedMeetings}</div>
								}
							</td>
							{/* Оценка */}
							<td>
								{
								<div>{user.rate}/5</div>
								}
							</td>
							{/* Кнопка удалить */}
							<td>
								{
								<button className={"btn btn-danger"} onClick={()=>handleDelete(user._id)}>delete</button>
								}
							</td>
						</tr>
					)
				}
			</tbody>
		</table>}
        </>
    )
}

export default Users