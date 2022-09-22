export class PeriodDto {
    id: string
    name: string
    total: number
    totalEntries: number
    totalExpenses: number
    dateStart: Date
    dateEnd: Date

    constructor(
        id: string,
        name: string,
        total: number,
        totalEntries: number,
        totalExpenses: number,
        dateStart: Date,
        dateEnd: Date
    ) {
        this.id = id
        this.name = name
        this.total = total
        this.totalEntries = totalEntries
        this.totalExpenses = totalExpenses
        this.dateStart = dateStart
        this.dateEnd = dateEnd
    }
}