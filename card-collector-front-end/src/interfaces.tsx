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

type Role = "Player" | "Mascot" | "Coach" | "Referee" | "Pundit" | "Other"

interface Player {
    tempId: number;
    firstname: string;
    lastname: string;
    teamname: string;
    role: Role
}

interface Card {
    cardTempId: number;
    players: Player[];
    manufacturer: string;
    season: string;
    product: string;
    setName: string;
    setType: string;
    serial?: string;
    numberedTo?: string;
    rookie: boolean;
    autograph: boolean;
    memorabilia: boolean;
    jerseyNumMatch: boolean;
    colorMatch: boolean;
    checklistCard: boolean;
    stickerCard: boolean;
    promoCard: boolean;
    printingError: boolean;
    firstOwner: boolean;
    pc: boolean;
    comment: string;
    copies: number;
    price: number;
    competition?: string;
    clNum?: string;
    location?: string;
    origin?: string;
    dateAdded?: string;
    grade?: string;
    grader?: string;

}

export type { ChecklistFormInput, Intent, UserBody, UpdatedChecklistItem, Player, Card }