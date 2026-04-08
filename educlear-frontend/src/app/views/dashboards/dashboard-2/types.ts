export type StatisticType = {
    icon: string
    title: string
    subtitle: string
    count: number
    variant: 'info' | 'success' | 'warning' | 'danger'
    progress: number
}

export type CountryDataType = {
    rank: number
    code: string
    name: string
    flag: string
    trend: { value: number; type: 'success' | 'danger' | 'warning' }
    activeProjects: number
    projectName: string
}
