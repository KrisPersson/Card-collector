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

export type { ChecklistFormInput, Intent, UserBody, UpdatedChecklistItem }