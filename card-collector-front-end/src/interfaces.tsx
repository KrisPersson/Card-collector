interface ChecklistFormInput {
    company: string
    season: string
    product: string
    cardSet: string
}

type Intent = "login" | "signup"
interface UserBody {
    username: string;
    password: string;
}

interface UpdatedChecklistItem {
    cardId: number;
    isChecked: boolean;
}

interface Player {
    tempId: number;
    firstname: string;
    lastname: string;
    teamname: string;
}

interface Card {
    cardTempId: number;
    players: Player[];
    manufacturer: string;
    season: string;
    product: string;
    setName: string;
    setType: string;
    numberedTo: string;
    rookie: boolean;
    autograph: boolean;
    memorabilia: boolean;
    jerseyNumMatch: boolean;
    pc: boolean;
    comment: string;
    copies: number;
    price: number;
}

export type { ChecklistFormInput, Intent, UserBody, UpdatedChecklistItem, Player, Card }