export type TaskItemType = {
    id: string
    title: string
    user: string
    userName: string
    company: string
    date: string
    messages: number,
    tasks: number,
    amount: number,
    status: 'lead' | 'negotiation' | 'won' | 'lost'
}
