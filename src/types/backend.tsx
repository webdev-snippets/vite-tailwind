export interface Token {
    access_token: string
    token_type: string
}

export interface Status {
    status: string
}

export interface Health {
    status: string
    debug_level: string
    db_url: string
    issuer: string
    expire_time: number
}

export interface User {
    username: string
    email: string
    id: string
}

export interface Booking {
    time: string
    location: string
    notes?: string
    booking_type: 'consultation' | 'installation'
    id: string

}
export interface Product {
    id: string
    title: string
    description: string
    price: number
    tags: string[]
    image_uri?: string
}