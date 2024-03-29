
export type SetLists = SetListsCompany & {[key: string]: Company}

interface SetListsCompany {
    [company: string]: Company

}

interface NameCompany {
    name: string
}
interface SeasonCompany {
    [season: string]: Season
}

export type Company = NameCompany & SeasonCompany & {[key: string]: Season}

export interface Season {
    [product: string]: Product
}

interface NameProduct {
    name: string
}
interface SetsProduct {
    sets: CardSet[],
    name?: string
}

export type Path = {[key: string]: Company | Season | Product }

export type Product = NameProduct & SetsProduct & {[key: string]: CardSet[]}

export interface CardSet {
    setName: string;
    cardNumbers: {
        first: number,
        last: number
    },
    setType: string,
    packOdds?: string,
    numPrefix?: string,
    parallelSets?: ParallelCardSet[],
    numberedTo?: number,
    checklist: ChecklistCard[],
    setId: string
}

export interface ChecklistCard {
    number: number,
    firstname: string,
    lastname: string,
    teamname?: string,
    players?: Player[]
}

export interface ParallelCardSet {
    name: string,
    packOdds?: string,
    numberedTo?: number,
    numPrefix?: string,
    setId: string
}


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
    tempId?: number;
    firstname: string;
    lastname: string;
    teamname: string;
    role: Role
}

interface Card {
    [key: string]: number | string | boolean | Player[];
    
}

interface UserChecklist {
    company: string,
    id: string,
    personalChecklist: number[],
    product: string,
    season: string,
    setName: string,
    _id?: string
}

export type { UserChecklist, ChecklistFormInput, Intent, UserBody, UpdatedChecklistItem, Player, Card, Role }