export class SubcategoryDto {
    name: string
    categoryName: string
    amount: number
    id: string

    constructor(
        name: string,
        categoryName: string,
        amount: number,
        id: string
    ) {
        this.amount = amount
        this.categoryName = categoryName
        this.name = name
        this.id = id
    }
}