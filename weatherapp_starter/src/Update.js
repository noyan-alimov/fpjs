import * as R from 'ramda';

const MSGS = {
	LOCATION_INPUT: 'LOCATION_INPUT',
	SAVE_LOCATION: 'SAVE_LOCATION',
	DELETE_LOCATION: 'DELETE_LOCATION',
};

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
		default:
			return model;
	}
}

const addLocation = (model) => {
	const { nextId, location } = model;
	const newLocation = {
		id: nextId,
		location,
	};
	return {
		...model,
		nextId: nextId + 1,
		locations: [...model.locations, newLocation],
		location: '',
	};
};

export default update;
