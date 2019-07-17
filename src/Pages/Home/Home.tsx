import React from 'react';
import { SearchForm } from 'containers/Form/Form';
import { Map } from 'components/Map/Map';
import { Listing } from 'components/Property/Listing';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Pie } from 'components/Chart/Pie';
import allData from 'data/data';
import { Nav } from 'components/Nav/Nav';
import { Property, Data } from 'interfaces';
import { instanceOfProperty } from 'utils/checkProperty';
import './Home.scss';

interface HomeProps {}

interface HomeState {
	data: Data[];
	selectedProperty: Property | {};
	modal: boolean;
	showPie: boolean;
	beds: number;
	baths: number;
	typeList: string[];
	search: string;
	hoveredProperty: Property | boolean;
	mapPropertyType: string;
}

export class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);
		this.state = {
			data: [],
			selectedProperty: {},
			modal: false,
			showPie: false,
			beds: 0,
			baths: 0,
			typeList: ['Terraced', 'Detached', 'Semi-Detached', 'Apartment'],
			search: 'Dublin',
			mapPropertyType: '',
			hoveredProperty: false,
		};
	}

	componentWillMount() {
		this.setState({ data: allData });
	}

	hoverListing = (hoveredProperty: Property): void => {
		this.setState({ hoveredProperty });
	};

	leaveListing = (): void => {
		this.setState({ hoveredProperty: false });
	};

	renderProperties = (): JSX.Element[] | JSX.Element => {
		const { data } = this.state;

		return data.length ? (
			data.map(property => (
				<Listing
					details={property}
					onEnter={this.hoverListing}
					loadModal={this.showModal}
					onLeave={this.leaveListing}
				/>
			))
		) : (
			<div>No Property Found!</div>
		);
	};

	showModal = (selectedProperty: Property): void => {
		this.setState({ modal: true, selectedProperty });
	};

	closeModal = (): void => {
		this.setState({ modal: false });
	};

	showPie = (): void => {
		this.setState(prevState => ({
			showPie: !prevState.showPie,
			mapPropertyType: prevState.showPie ? '' : prevState.mapPropertyType,
		}));
	};

	highlightMapPoints = (mapPropertyType: string): void => {
		this.setState(prevState => ({
			mapPropertyType:
				prevState.mapPropertyType === mapPropertyType
					? ''
					: mapPropertyType,
		}));
	};

	renderSimilar = (): JSX.Element[] | JSX.Element => {
		const { data, selectedProperty } = this.state;
		const filteredData = data.filter(
			property => property !== selectedProperty,
		);
		const similarData = filteredData.slice(0, 3);
		return similarData.length ? (
			similarData.map(property => (
				<Listing
					details={property}
					loadModal={this.showModal}
					className="similar-listing"
				/>
			))
		) : (
			<div>No Simliar Properties Found!</div>
		);
	};

	filterData = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		this.submitFormData();
	};

	submitFormData = (): void => {
		const { beds, baths, typeList, search } = this.state;
		const filtered = allData.filter(property => {
			const searchFilter = property.address.includes(
				search.toUpperCase(),
			);
			const filterType = typeList.includes(property.type);
			const bathFilter =
				baths > 0 ? property.baths === baths : property.baths > 0;
			const bedsFilter =
				beds > 0 ? property.beds === beds : property.beds > 0;
			return bathFilter && bedsFilter && filterType && searchFilter;
		});
		this.setState({ data: filtered, showPie: false, mapPropertyType: '' });
	};

	onChangeBeds = (beds: number): void => {
		this.setState({ beds });
	};

	onChangeBaths = (baths: number): void => {
		this.setState({ baths });
	};

	onChangeText = async (
		e: React.ChangeEvent<HTMLInputElement>,
	): Promise<void> => {
		if (typeof e.target.value === 'string') {
			await this.setState({ search: e.target.value });
		}
		this.submitFormData();
	};

	onChangeType = async (type: string): Promise<void> => {
		await this.setState(prevState => ({
			typeList: prevState.typeList.includes(type)
				? prevState.typeList.filter(types => types !== type)
				: prevState.typeList.concat(type),
		}));
		this.submitFormData();
	};

	resetForm = (): void => {
		this.setState({
			baths: 0,
			beds: 0,
			typeList: ['Terraced', 'Detached', 'Semi-Detached', 'Apartment'],
			search: 'Dublin',
			showPie: false,
			mapPropertyType: '',
		});
	};

	render() {
		const {
			data,
			selectedProperty,
			hoveredProperty,
			modal,
			showPie,
			beds,
			baths,
			typeList,
			search,
			mapPropertyType,
		} = this.state;
		return (
			<div className="wrapper">
				<Nav />
				{modal && instanceOfProperty(selectedProperty) ? (
					<Modal
						onClose={this.closeModal}
						renderSimilar={this.renderSimilar}
						data={data}
						details={selectedProperty}
					/>
				) : null}
				<div className="main-section">
					<SearchForm
						filterData={this.filterData}
						resetForm={this.resetForm}
						onChangeBeds={this.onChangeBeds}
						bedsSelected={beds}
						bathsSelected={baths}
						onChangeType={this.onChangeType}
						typeSelected={typeList}
						onChangeBaths={this.onChangeBaths}
						onChangeText={this.onChangeText}
						search={search}
					/>
					<div className="d-flex h-100">
						<div className="left-section">
							<div className="results">
								<span className="results-number">
									{data.length === 1
										? `${data.length} result found`
										: `${data.length} results found`}
								</span>
								{data.length ? (
									<Button
										type="button"
										text="View Breakdown of Results"
										onPress={this.showPie}
									/>
								) : null}
								{showPie && data.length ? (
									<Pie
										pieData={data}
										highlightMapPoints={
											this.highlightMapPoints
										}
									/>
								) : null}
							</div>
							<div className="listings-container">
								{this.renderProperties()}
							</div>
						</div>
						<div className="map-container">
							<Map
								data={data}
								loadModal={this.showModal}
								mapPropertyType={mapPropertyType}
								showInfoWindow={hoveredProperty}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
