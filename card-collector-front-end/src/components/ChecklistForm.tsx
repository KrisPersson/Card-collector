import "./ChecklistForm.css"
import setLists from "../../../back-end/JSONchecklists/checklists.json"
import { useState } from 'react'
import { postNewUserChecklist } from '../api'
import { ChecklistFormInput, SetLists, Company, Season, Product, CardSet, ParallelCardSet } from '../interfaces'

function ChecklistForm(
    {
        setShowCreateChecklistModal, 
        setRefetchChecklistCollectionRefArr
    }:
    {
        setShowCreateChecklistModal: React.Dispatch<React.SetStateAction<boolean>>, 
        setRefetchChecklistCollectionRefArr: React.Dispatch<React.SetStateAction<number[]>>
    }
) {
    const sLists = {...setLists} as unknown as SetLists

    const [company, setCompany] = useState('')
    const [season, setSeason] = useState('')
    const [product, setProduct] = useState('')
    const [cardSet, setCardSet] = useState('')

    function changeState(value: string, prop: string) {
        switch (prop) {
            case "company":
                setCompany(value)
                setSeason('')
                setProduct('')
                setCardSet('')
                break
            case "season": 
                setSeason(value)
                setProduct('')
                setCardSet('')
                break
            case "product": 
                setProduct(value)
                setCardSet('')
                break
            case "cardSet": 
                setCardSet(value)
                break
        }
    }

    function renderOptions(path: Company | Product | Season | SetLists) {
        const options = []
        let index = 0
        for (const prop in path) {
            if (prop !== 'name') {
                const pathProp = path[prop]
                options.push(<option key={index} value={prop}>{ pathProp.name ? pathProp.name : prop }</option>)
                index += 1
            }
        }
        return options
    }

    function renderCardSetOptions(array: CardSet[]) {
        const options = []
        let index = 0
        for (const set of array) {
            options.push(<option key={index} value={set.setName}>{ set.setName }</option>)
            index += 1
            if (set.parallelSets) {
                for (const paraSet of set.parallelSets as ParallelCardSet[]) {
                    options.push(<option key={index} value={paraSet.name}>{ paraSet.name }</option>)
                    index += 1
                }
            }
        }
        return options
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const token = localStorage.getItem('userToken') || ""
        const userId = localStorage.getItem('userId') || ""
        const formInput: ChecklistFormInput = {
            company: company,
            season: season,
            product: product,
            cardSet: cardSet
        }
        const databaseInsert = await postNewUserChecklist(userId, token, formInput)
        setRefetchChecklistCollectionRefArr((prev) => [...prev, 2])
        setShowCreateChecklistModal(false)
        console.log(databaseInsert)
    }

    

    return (
        <form onSubmit={(event) => handleSubmit(event) } className="checklist-form" action="">
            <label>
                Company
                <select value={company} onChange={(e)=> changeState(e.target.value, "company")} name="company" id="">
                    <option selected disabled value="">-Pick a company-</option>
                    { renderOptions(sLists) }
                </select>
            </label>
            { 
            company !== '' &&  
                <label>
                    Season
                    <select defaultValue='' onChange={(e)=> changeState(e.target.value, "season")} name="season" id="">
                        <option selected disabled value="">-Pick a season-</option>
                        { renderOptions(sLists[company]) }
                    </select>
                </label>
            }
            {
            season !== '' && 
                <label>
                    Product
                    <select defaultValue='' onChange={(e)=> changeState(e.target.value, "product")} name="product" id="">
                        <option selected disabled value="">-Pick a product-</option>
                        { renderOptions(sLists[company][season]) }
                    </select>
                </label>
            }
            {
            product !== '' &&  
                <label>
                    Card set
                    <select defaultValue='' onChange={(e)=> changeState(e.target.value, "cardSet")} name="cardset" id="">
                        <option selected disabled value="">-Pick a Card set-</option>
                        { renderCardSetOptions(sLists[company][season][product].sets) }
                    </select>
                </label>
            }   
            {
            cardSet !== '' &&
                <button>Create Checklist</button>
            }
            
        </form>
    )
}

export default ChecklistForm
