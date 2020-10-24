import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { pre, div, h1, textarea, button, i } = hh(h);

function inputTextArea(label) {
  return div([
    div({ className: 'b f6 mv1' }, label),
    textarea({ className: 'w-100 bg-washed-yellow outline-0' })
  ])
}

function formView(dispatch, model) {
  return div({ className: 'w-third bg-light-yellow pa3' }, [
    inputTextArea('Question'),
    inputTextArea('Answer'),
    button({ className: 'f4 ph3 pv2 br1 bg-gray bn white mv2' }, 'Save')
  ])
}

function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    button({ className: 'pa2 br1 mv2 bg-green bn white' }, 'Add Flashcard'),
    formView(dispatch, model),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
