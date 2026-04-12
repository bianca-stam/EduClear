export type TicketStatisticType = {
    id: number;
    title: string;
    value: number;
    icon: string;
    bgColor: string;
    textColor: string;
};

export type TicketType = {
    id: string
    requestedBy: string
    requestedByImg: string
    subject: string
    agent: string
    agentImg: string
    priority: 'Low' | 'Medium' | 'High' | 'Urgent'
    status: 'Open' | 'Pending' | 'Resolved' | 'Closed' | 'Escalated' | 'In Progress'
    createdAt: string
    createdAtTime: string
    dueDate: string
    selected?: boolean
}
