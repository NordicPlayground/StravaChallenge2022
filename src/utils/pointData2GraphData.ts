import { teamColors } from 'utils/teamColors.js'

export type PointData = {
	week: number
	club: string
	points: number
}[]

export const pointData2GraphData = (data: PointData): GraphData => {
	const result: GraphData = {} as any
	result.labels = ['']
	result.datasets = []
	for (const weeklyData of data) {
		let duplicate = false
		if (result.labels.includes(`Week ${weeklyData.week.toString()}`)) {
			console.log('already in list')
		} else {
			result.labels.push(`Week ${weeklyData.week.toString()}`)
		}
		for (const dataset of result.datasets) {
			if (dataset.label.includes(weeklyData.club)) {
				dataset.data.push(weeklyData.points)
				duplicate = true
			}
		}
		const clubName = weeklyData.club
		if (!duplicate) {
			result.datasets.push({
				label: clubName,
				data: [0, weeklyData.points],
				fill: false,
				borderColor: teamColors[clubName],
				tension: 0.1,
			})
		}
	}
	return result
}

export type GraphData = {
	labels: string[]
	datasets: {
		label: string
		data: number[]
		fill: boolean
		borderColor: string
		tension: number
	}[]
}
