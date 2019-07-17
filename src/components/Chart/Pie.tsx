import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Property } from 'interfaces';

interface PieProps {
	pieData: Property[];
	highlightMapPoints?: (pointName: string) => void;
}

interface PieState {
	chartOptions: {};
}

export class Pie extends React.Component<PieProps, PieState> {
	constructor(props: PieProps) {
		super(props);
		this.state = {
			chartOptions: {},
		};
	}

	componentWillMount() {
		this.renderChart();
	}

	renderChart = () => {
		const { pieData, highlightMapPoints } = this.props;
		const data: { [key: string]: number } = {
			Terraced: 0,
			Detached: 0,
			'Semi-Detached': 0,
			Apartment: 0,
		};

		const color: { [key: string]: string } = {
			Terraced: '#5A76DB',
			Detached: 'rgb(223, 39, 39)',
			'Semi-Detached': 'rgb(235, 235, 49)',
			Apartment: 'rgb(28, 163, 28)',
		};

		pieData.forEach(d => {
			data[d.type] += 1;
		});

		const chartOptions = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
			},
			title: {
				text: '',
			},
			tooltip: {
				pointFormat: '<b>{point.y}</b>',
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false,
					},
					events: {
						click: highlightMapPoints
							? (e: any) => highlightMapPoints(e.point.name)
							: null,
					},
					showInLegend: true,
				},
			},
			series: [
				{
					data: Object.keys(data).map(key => {
						if (
							data.hasOwnProperty(key) &&
							color.hasOwnProperty(key)
						) {
							return {
								name: key,
								y: data[key],
								color: color[key],
							};
						}
						return null;
					}),
				},
			],
			credits: false,
		};
		this.setState({ chartOptions });
	};

	render() {
		const { chartOptions } = this.state;
		return (
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		);
	}
}
