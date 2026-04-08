export type StatCardType = {
    id: number
    title: string
    value: number
    suffix?: string
    prefix?: string
    icon: string
    iconBg?: string
}

export type ProductType = {
    id: number
    image: string
    name: string
    category: string
    stock: string
    price: string
    ratings: number
    reviews: number
    status: string
    statusVariant: 'success' | 'warning' | 'danger'
}

export type OrderType = {
    id: string
    userImage: string
    userName: string
    product: string
    date: string
    amount: string
    status: string
    statusVariant: 'success' | 'warning' | 'danger'
}
