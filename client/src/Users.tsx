import React from "react"
import { Box, Typography } from "@mui/material"
import { useMutation } from "@apollo/client"
import {  DELETE_USER } from "./mutation/user"
import DeleteIcon from '@mui/icons-material/Delete';

export type User = {
	id: string,
	username: string,
	age: number
}

const Users: React.FC<{
    users: User[], 
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}> = ({users, setUsers}) => {

	const [deleteUser] = useMutation(DELETE_USER)

    const DeleteUser = async (userIdToDelete: string) => {
		try {
			await deleteUser({
				variables: {
					id: userIdToDelete
				}
			})

			setUsers(users.filter(user => user.id !== userIdToDelete))
		}
		catch(e) {
			console.log(e)
		}
	}

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", padding: "4rem 3rem", border: "2px solid black"}}>
            {users.length ? 
                    users?.map(user => <Box key={user.id} sx={{display: "flex", flexDirection: "row", gap: ".5rem"}}>
                        <Typography>{user.id}. {user.username} ({user.age})</Typography>
                        <Box onClick={() => DeleteUser(user.id)}><DeleteIcon /></Box>
                    </Box>
                )
                : <Typography>Data not found</Typography>
            }
        </Box>
    )
}

export default Users