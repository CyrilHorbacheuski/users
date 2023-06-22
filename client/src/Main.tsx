import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { useQuery, DocumentNode } from "@apollo/client"
import { GET_ALL_USERS, GET_USER_BY_ID } from "./query/user"
import Users, { User } from "./Users"
import Form from "./Form"

const Main = () => {
	const [id, setId] = useState<number>(0);

	const [users, setUsers] = useState<User[]>([])

	const [queryEndpoint, setQueryEndpoint] = useState<DocumentNode>(GET_ALL_USERS)

	const {data, loading, error} = useQuery(queryEndpoint, {
		variables: {
			id: id,
		}
	})

	useEffect(() => {
		if(!loading) {
			switch(queryEndpoint) {
				case GET_ALL_USERS: {
					if(data?.getAllUsers != null)
						setUsers(data?.getAllUsers)
					else setUsers([])
				}; break;

				case GET_USER_BY_ID: {
					if(data?.getUser != null)
						setUsers([{...data?.getUser}])
					else setUsers([])
				}; break;
			}
		}
	}, [data])

	
  	return (
		<Box sx={{display: "grid", gap: "5rem", gridTemplateColumns: "1fr 1fr"}}>
			<Form users={users} setUsers={setUsers} setQueryEndpoint={setQueryEndpoint} id={id} setId={setId} />
			<Users users={users} setUsers={setUsers}/>
		</Box>
	);
}

export default Main;
