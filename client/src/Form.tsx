import React, {useState} from "react"
import { Button, Box, Typography, TextField } from "@mui/material"
import { useMutation, DocumentNode } from "@apollo/client"
import {  CREATE_USER } from "./mutation/user"
import { User } from "./Users";
import { GET_ALL_USERS, GET_USER_BY_ID } from "./query/user";

type UserInput = {
	username: string,
	age: number
}

const Form: React.FC<{
    id: number
    setId: React.Dispatch<React.SetStateAction<number>>
    setQueryEndpoint: React.Dispatch<React.SetStateAction<DocumentNode>>
    users: User[], 
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}> = ({users, setUsers, setQueryEndpoint, id, setId}) => {

	const [newUser] = useMutation(CREATE_USER)

    const [userInput, setUserInput] = useState<UserInput>({
        username: "",
        age: 0
    })

    const CreateUser = async () => {
		try {
			let user = (await newUser({
				variables: {
					input: userInput
				}
			})).data

			console.log(user)

			setUsers([...users, {...user?.createUser}])
		}
		catch(e) {
			console.log(e)
		}
	}

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "3rem"}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", padding: "4rem 3rem", border: "2px solid black"}}>
                <Typography>Найти пользователя по id</Typography>
                <TextField value={id} onChange={(e) => setId(Number(e.target.value))} placeholder="Введите id" />
                <Button variant="contained" onClick={() => setQueryEndpoint(GET_USER_BY_ID)}>Найти</Button>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", padding: "4rem 3rem", border: "2px solid black"}}>
                <Typography>Отобразить всех пользователей</Typography>
                <Button variant="contained" onClick={() => setQueryEndpoint(GET_ALL_USERS)}>Отобразить</Button>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", padding: "4rem 3rem", border: "2px solid black"}}>
                <Typography>Добавить пользователя</Typography>

                <TextField value={userInput.username} onChange={(e) => setUserInput({...userInput, username: e.target.value})} placeholder="Введите имя" />
                <TextField value={userInput.age} onChange={(e) => setUserInput({...userInput, age: Number(e.target.value)})} placeholder="Введите возраст" />
                <Button variant="contained" onClick={CreateUser}>Добавить</Button>
            </Box>
        </Box>
    )
}

export default Form