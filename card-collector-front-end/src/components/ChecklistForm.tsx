import "./ChecklistForm.css"
import setLists from "../../../back-end/JSONchecklists/checklists.json"
import { useState } from 'react'


function ChecklistForm() {

    const [company, setCompany] = useState('')
    const [season, setSeason] = useState('')
    const [product, setProduct] = useState('')
    const [cardSet, setCardSet] = useState('')

    function changeState(value, prop) {
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

    function renderOptions(path) {
        const options = []
        let index = 0
        for (const prop in path) {
            if (prop !== 'name') {
                options.push(<option key={index} value={prop}>{ path[prop].name ? path[prop].name : prop }</option>)
                index += 1
            }
        }
        return options
    }

    function renderCardSetOptions(array) {
        const options = []
        let index = 0
        for (const set of array) {
            options.push(<option key={index} value={set.setName}>{ set.setName }</option>)
            index += 1
            if (set.parallelSets) {
                for (let paraSet of set.parallelSets) {
                    options.push(<option key={index} value={paraSet.name}>{ paraSet.name }</option>)
                    index += 1
                }
            }
        }
        return options
    }

    

    return (
        <form className="checklist-form" action="">
            <label>
                Company
                <select value={company} onChange={(e)=> changeState(e.target.value, "company")} name="company" id="">
                    <option selected disabled value="">-Pick a company-</option>
                    { renderOptions(setLists) }
                </select>
            </label>
            { 
            company !== '' &&  
                <label>
                    <select defaultValue='' onChange={(e)=> changeState(e.target.value, "season")} name="season" id="">
                        <option selected disabled value="">-Pick a season-</option>
                        { renderOptions(setLists[company]) }
                    </select>
                </label>
            }
            {
            season !== '' && 
                <label>
                    <select defaultValue='' onChange={(e)=> changeState(e.target.value, "product")} name="product" id="">
                        <option selected disabled value="">-Pick a product-</option>
                        { renderOptions(setLists[company][season]) }
                    </select>
                </label>
            }
            {
            product !== '' &&  
                <label>
                    <select defaultValue='' onChange={(e)=> changeState(e.target.value, "cardSet")} name="cardset" id="">
                        <option selected disabled value="">-Pick a Card set-</option>
                        { renderCardSetOptions(setLists[company][season][product].sets) }
                    </select>
                </label>
            }   
            
        </form>
    )
}

export default ChecklistForm
