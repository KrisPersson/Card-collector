import "./ChecklistView.css"
import { Checklist } from "../components/Checklist"
import { ud9495checklist } from "../upperdeck9495"
import { ChecklistItem } from "../components/ChecklistItem"

function ChecklistView() {


const checklistItems = ud9495checklist.map((card, i) => <ChecklistItem key={i} cardNumber={i + 1} card={ card } />)

    return (
        <Checklist 
            company="Upper Deck"
            product="Series 1"
            season="1994-95"
            setName="Electric Ice"
            setType="Parallel"
            packOdds="1:36"
            cards={ checklistItems }
        />
    )
}


export { ChecklistView }
