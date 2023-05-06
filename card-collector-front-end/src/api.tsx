
const BASE_URL = "http://localhost:8000/api"

type Intent = "login" | "signup"
interface UserBody {
    username: string;
    password: string;
}

async function user(body: UserBody, intent: Intent) {

    try {
        const response = await fetch(BASE_URL + "/user/" + intent, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const data = await response.json()
        console.log(data)
        if (intent === 'login') {
            localStorage.setItem('userToken', data?.token)
        }
    } catch (error) {
        console.log(error)
    }
     
    
}


export { user }
