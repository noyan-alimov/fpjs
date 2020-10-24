import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { 
  showFormMsg, 
  questionInputMsg, 
  answerInputMsg, 
  saveFlashcardMsg,
  deleteFlashcardMsg,
  editFlashcardMsg,
  showAnswerOfFlashcardMsg,
  editRankingOfFlashcardMsg
} from "./Update";

const { pre, div, h1, textarea, button } = hh(h);

const inputTextArea = (label, value, oninput) => {
  return div([
    div({ className: 'b f6 mv1' }, label),
    textarea(
      { 
        className: 'w-100 bg-washed-yellow outline-0',
        value,
        oninput
      }
    )
  ])
}

const formView = (dispatch, model) => {
  if (model.showForm) {
    return div({ className: 'w-third bg-light-yellow pa3' }, [
      inputTextArea(
        'Question', 
        model.question,
        e => dispatch(questionInputMsg(e.target.value))
      ),
      inputTextArea(
        'Answer', 
        model.answer,
        e => dispatch(answerInputMsg(e.target.value))
      ),
      button(
        { 
          className: 'f4 ph3 pv2 br1 bg-gray bn white mv2',
          onclick: () => dispatch(saveFlashcardMsg)
        }, 'Save'
      ),
      button(
        { 
          className: 'f4 ph3 pv2 br1 bg-light-red bn white mv2 mh3',
          onclick: () => dispatch(showFormMsg(false))
        }, 'Cancel'
      )
    ])
  }
}

const rankingButtons = (dispatch, flashcard) => {
  return div({ className: 'flex' }, [
    button(
      {
        className: 'white bn pa2 mv2 bg-red',
        onclick: () => dispatch(editRankingOfFlashcardMsg(flashcard.id ,0))
      },
      'Bad'
    ),
    button(
      {
        className: 'white bn pa2 mv2 bg-blue',
        onclick: () => dispatch(editRankingOfFlashcardMsg(flashcard.id, 1))
      },
      'Good'
    ),
    button(
      {
        className: 'white bn pa2 mv2 bg-pink',
        onclick: () => dispatch(editRankingOfFlashcardMsg(flashcard.id, 2))
      },
      'Great'
    )
  ])
};

const card = (dispatch, flashcard) => {
  if (flashcard.showAnswer) {
    return div({ className: 'w-third bg-light-yellow pa3 ma2' }, [
      div('Question'),
      div(
        {
          className: 'pointer',
          onclick: () => dispatch(editFlashcardMsg(flashcard.id)) 
        }, 
        flashcard.question
      ),
      div(flashcard.answer),
      div(
        {
          className: 'pointer',
          onclick: () => dispatch(showAnswerOfFlashcardMsg(flashcard.id))
        }, 
        'Hide Answer'
      ),
      button(
        {
          className: 'ma3 pa2 bg-light-red white br1 bn',
          onclick: () => dispatch(deleteFlashcardMsg(flashcard.id)) 
        }, 
        'Delete'
      ),
      rankingButtons(dispatch, flashcard)
    ])
  }
  return div({ className: 'w-third bg-light-yellow pa3 ma2' }, [
    div('Question'),
    div(
      {
        className: 'pointer',
        onclick: () => dispatch(editFlashcardMsg(flashcard.id)) 
      }, 
      flashcard.question
    ),
    div(
      {
        className: 'pointer',
        onclick: () => dispatch(showAnswerOfFlashcardMsg(flashcard.id))
      }, 
      'Show Answer'
    ),
    button(
      {
        className: 'ma3 pa2 bg-light-red white br1 bn',
        onclick: () => dispatch(deleteFlashcardMsg(flashcard.id)) 
      }, 
      'Delete'
    )
  ])
};

const flashcardsBody = (dispatch, flashcards) => {
  const sortByRank = R.sortBy(R.prop('rank'))
  const cards = R.pipe(
    sortByRank,
    R.map(
      R.partial(card, [dispatch])
    )
  )(flashcards)

  return div({ className: 'flex' }, cards)
};

const flashcardsView = (dispatch, flashcards) => {
  if (flashcards.length === 0) {
    return div({ className: 'mv2 i black-50' }, 'No flashcards to display...')
  }
  return div({ className: 'pa2' }, [
    flashcardsBody(dispatch, flashcards)
  ])
};

const view = (dispatch, model) => {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    button(
      { 
        className: 'pa2 br1 mv2 bg-green bn white',
        onclick: () => dispatch(showFormMsg(true))
      }, 
      'Add Flashcard'
    ),
    formView(dispatch, model),
    flashcardsView(dispatch, model.flashcards),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
