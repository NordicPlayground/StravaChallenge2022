import type { StravaObject } from 'app/pages/Strava'
import { getWeek } from 'date-fns'
import type { PointData } from 'utils/pointData2GraphData.js'

export const summaryDataToPointData = (
	data: StravaObject[],
): PointData | undefined => {
	const result: PointData = []
	if (data === undefined) {
		return
	}
	for (const week of data) {
		const weekNumber = getWeek(week.timestamp * 1000, {
			weekStartsOn: 1,
			firstWeekContainsDate: 4,
		})
		console.log(weekNumber)
		for (const officeData of week.summary) {
			let clubName = officeData.name.split('- ').pop()
			if (clubName === undefined) {
				console.log('Clubname undefined')
				return
			}
			if (clubName?.includes('Office')) {
				clubName = clubName.slice(0, -7)
			}
			if (clubName?.includes('NTNU')) {
				clubName = clubName.slice(0, -5)
			}
			let oldPoints = 0
			for (const res of result) {
				if (res.club === clubName && res.week === weekNumber - 1) {
					console.log(result)
					oldPoints += res.points
				}
			}
			result.push({
				week: weekNumber,
				club: clubName,
				points: officeData.clubPoints + oldPoints,
			})
			oldPoints = 0
		}
	}
	return result
}
