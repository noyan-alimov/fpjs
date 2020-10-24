import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { billInputMsg, tipInputMsg } from "./Update";

const {
  div,
  h1,
  pre,
  label,
  input,
  table,
  tr,
  td
} = hh(h);

function inputSet(dispatch, model) {
  return div({ className: 'flex flex-column' },[
    label({ className: 'pa2' }, 'Bill amount'),
    input({
      type: 'text',
      className: 'mv2 pa2 ba',
      value: model.bill,
      oninput: e => dispatch(billInputMsg(e.target.value))
    }),
    label({ className: 'pa2' }, 'Tip %'),
    input({
      type: 'text',
      className: 'mv2 pa2 ba',
      value: model.tip,
      oninput: e => dispatch(tipInputMsg(e.target.value))
    })
  ])
}

function outputSet(dispatch, model) {
  return table({ className: 'w-100' }, [
    tr([
      td('Tip'),
      td(`${model.calculatedTip}`)
    ]),
    tr([
      td('Total'),
      td(`${model.calculatedTotal}`)
    ])
  ])
}

function container(dispatch, model) {
  return div([
    inputSet(dispatch, model),
    outputSet(dispatch, model)
  ])
}


function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    container(dispatch, model)
    // pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
