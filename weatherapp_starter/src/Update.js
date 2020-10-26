import * as R from 'ramda';

const MSGS = {
	LOCATION_INPUT: 'LOCATION_INPUT',
	SAVE_LOCATION: 'SAVE_LOCATION',
	DELETE_LOCATION: 'DELETE_LOCATION',
	HTTP_SUCCESS: 'HTTP_SUCCESS',
};

const APPID = 'a2adda676ea3cad6bbeba93ebfcbba31';

const weatherUrl = (city) => {
	return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
		city
	)}&units=imperial&APPID=${APPID}`;
};

const httpSuccessMsg = R.curry((id, response) => ({
	type: MSGS.HTTP_SUCCESS,
	id,
	response,
}));

export const locationInputMsg = (location) => ({
	type: MSGS.LOCATION_INPUT,
	location,
});

export const saveLocationMsg = {
	type: MSGS.SAVE_LOCATION,
};

export const deleteLocationMsg = (locationId) => ({
	type: MSGS.DELETE_LOCATION,
	locationId,
});

function update(msg, model) {
	switch (msg.type) {
		case MSGS.LOCATION_INPUT:
			const { location } = msg;
			return { ...model, location };
		case MSGS.SAVE_LOCATION:
			return addLocation(model);
		case MSGS.DELETE_LOCATION:
			const locations = R.filter(
				(location) => location.id !== msg.locationId,
				model.locations
			);
			return {
				...model,
				locations,
			};
		case MSGS.HTTP_SUCCESS:
			const { id, response } = msg;
			const { temp, temp_min, temp_max } = R.pathOr(
				{},
				['data', 'main'],
				response
			);
			const updatedLocations = R.map((location) => {
				if (location.id === id) {
					return {
						...location,
						temp: Math.round(temp),
						low: Math.round(temp_min),
						high: Math.round(temp_max),
					};
				}
				return location;
			}, model.locations);
			return {
				...model,
				locations: updatedLocations,
			};
		case MSGS.HTTP_ERROR:
			const { error } = msg;
			return { ...model, error: error.message };
		default:
			return model;
	}
}

const addLocation = (model) => {
	const { nextId, location } = model;
	const newLocation = {
		id: nextId,
		location,
		temp: '?',
		low: '?',
		high: '?',
	};
	return [
		{
			...model,
			nextId: nextId + 1,
			locations: [...model.locations, newLocation],
			location: '',
		},
		{
			request: { url: weatherUrl(location) },
			successMsg: httpSuccessMsg(nextId),
		},
	];
};

export default update;
