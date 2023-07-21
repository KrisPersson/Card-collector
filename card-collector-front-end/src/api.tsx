import { ChecklistFormInput, UserBody, Intent, Card } from "./interfaces";
const BASE_URL = "http://localhost:8000/api"





async function user(body: UserBody, intent: Intent) {
    const { username } = body
    try {
        const response = await fetch(BASE_URL + "/user/" + intent, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const data = await response.json()
        if (intent === 'login') {
            localStorage.setItem('userToken', data?.token)
            localStorage.setItem('username', username)
            localStorage.setItem('userId', data?.id)
            return data?.id
        } else {
            localStorage.setItem('userToken', '')
            localStorage.setItem('username', '')
            localStorage.setItem('userId', '')
        }
        console.log(localStorage)
    } catch (error) {
        console.log(error)
    }
}

async function verifyToken(token: string) {
    if (!token) return false
    try {
        const response = await fetch(BASE_URL + "/user/verify", {
            method: "GET",
            headers: {authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        console.log(data)
        if (data.success) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

async function postNewUserChecklist(userId: string,
        token: string, formInput: ChecklistFormInput) {
            console.log(userId)
    try {
        const { company, season, product, cardSet } = formInput
        const body = {
            userId: userId,
            company: company,
            season: season,
            product: product,
            setName: cardSet
        }
        const response = await fetch(BASE_URL + "/checklist", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

async function postNewInventory(userid: string, formInput: Card[], token: string ) {
    try {
        const response = await fetch(BASE_URL + "/inventory", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'userid': userid
            },
            body: JSON.stringify(formInput)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}

async function getInventory(userid: string, token: string) {
    try {
        const response = await fetch(BASE_URL + "/inventory", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'userid': userid
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}

async function editInventory(userid: string, formInput: Card, cardId: string, token: string ) {

    const body = {
        cardId: cardId,
        updates: {...formInput}
    }
    console.log(formInput)
    try {
        const response = await fetch(BASE_URL + "/inventory", {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'userid': userid
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}




export { user, verifyToken, BASE_URL, postNewUserChecklist, postNewInventory, getInventory, editInventory }
