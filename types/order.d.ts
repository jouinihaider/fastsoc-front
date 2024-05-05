export interface Order {
    id: number | null
    customerId: integer | null
    offerId: integer | null
    licenseCount: string | null
    description: string | null
    vendors: array | []
}