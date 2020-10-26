import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { locationInputMsg, saveLocationMsg, deleteLocationMsg } from './Update';

const { div, h1, pre, form, label, input, button, h5, h3 } = hh(h);

const locationInputView = (dispatch, model) => {
	return form({ className: 'flex justify-around' }, [
		label('Location'),
		input({
			type: 'text',
			className: 'pa2',
			value: model.location,
			oninput: (e) => dispatch(locationInputMsg(e.target.value)),
		}),
		button(
			{
				className: 'pa2 bn br1 pointer dim',
				onclick: (e) => {
					e.preventDefault();
					dispatch(saveLocationMsg);
				},
			},
			'Add'
		),
	]);
};

const locationView = (dispatch, location) => {
	console.log(location);
	return div({ className: 'flex mt4' }, [
		div([h5('Location'), h3(location.location)]),
		div({ className: 'ml6' }, [h5('Temp'), h3(`${location.temp}`)]),
		div({ className: 'ml3' }, [h5('Low'), h3(`${location.low}`)]),
		div({ className: 'ml3' }, [h5('High'), h3(`${location.high}`)]),
		div({ className: 'tc' }, [
			button(
				{
					className: 'pa2 bn br1 pointer dim bg-light-red white',
					onclick: () => dispatch(deleteLocationMsg(location.id)),
				},
				'X'
			),
		]),
	]);
};

const locationsView = (dispatch, locations) => {
	const locationsViewArray = R.map(
		R.partial(locationView, [dispatch]),
		locations
	);

	return div({ className: 'flex flex-column' }, locationsViewArray);
};

function view(dispatch, model) {
	return div({ className: 'mw6 center' }, [
		h1({ className: 'f2 pv2 bb' }, 'Weather'),
		locationInputView(dispatch, model),
		locationsView(dispatch, model.locations),
		pre(JSON.stringify(model, null, 2)),
	]);
}

export default view;
