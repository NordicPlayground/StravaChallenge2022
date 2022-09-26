import type { SummaryData } from "utils/hourlyPoints.js"

export const sortSummaryByHours = (summary: SummaryData) =>{
    console.log(summary)
    const copyOfSummary = [...summary]
    return (copyOfSummary ?? []).sort(
        (a: { hours: number }, b: { hours: number }) => b.hours - a.hours,
    )
}