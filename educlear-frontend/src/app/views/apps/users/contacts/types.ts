export type ContactType = {
    id: number
    name: string
    avatar: string
    flag: string
    role: string
    badge: { label: string, color: string },
    username: string
    website: string,
    stats: { posts: number, followers: string, followings: number },
    lastUpdated: string
}
