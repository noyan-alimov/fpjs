import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  QUESTION_INPUT: 'QUESTION_INPUT',
  ANSWER_INPUT: 'ANSWER_INPUT',
  SAVE_FLASHCARD: 'SAVE_FLASHCARD',
  DELETE_FLASHCARD: 'DELETE_FLASHCARD',
  EDIT_FLASHCARD: 'EDIT_FLASHCARD',
  SHOW_ANSWER_OF_FLASHCARD: 'SHOW_ANSWER_OF_FLASHCARD',
  EDIT_RANKING_OF_FLASHCARD: 'EDIT_RANKING_OF_FLASHCARD'
}

export const showFormMsg = showForm => ({
  type: MSGS.SHOW_FORM,
  showForm
});

export const questionInputMsg = question => ({
  type: MSGS.QUESTION_INPUT,
  question
});

export const answerInputMsg = answer => ({
  type: MSGS.ANSWER_INPUT,
  answer
});

export const saveFlashcardMsg = { type: MSGS.SAVE_FLASHCARD };

export const deleteFlashcardMsg = flashcardId => ({
  type: MSGS.DELETE_FLASHCARD,
  flashcardId
});

export const editFlashcardMsg = flashcardId => ({
  type: MSGS.EDIT_FLASHCARD,
  flashcardId
});

export const showAnswerOfFlashcardMsg = flashcardId => ({
  type: MSGS.SHOW_ANSWER_OF_FLASHCARD,
  flashcardId
});

export const editRankingOfFlashcardMsg = (flashcardId, rank) => ({
  type: MSGS.EDIT_RANKING_OF_FLASHCARD,
  flashcardId,
  rank
});

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM:
      const { showForm } = msg;
      return { ...model, showForm }
    case MSGS.QUESTION_INPUT:
      const { question } = msg;
      return { ...model, question }
    case MSGS.ANSWER_INPUT:
      const { answer } = msg;
      return { ...model, answer }
    case MSGS.SAVE_FLASHCARD:
      if (model.editId !== null) {
        return editFlashcard(model)
      }
      return addFlashcard(model)
    case MSGS.DELETE_FLASHCARD:
      const flashcards = R.filter(
        flashcard => flashcard.id !== msg.flashcardId, 
        model.flashcards
      )
      return { ...model, flashcards }
    case MSGS.EDIT_FLASHCARD:
      const flashcard = R.find(
        flashcard => flashcard.id === msg.flashcardId,
        model.flashcards
      )
      return {
        ...model,
        editId: msg.flashcardId,
        question: flashcard.question,
        answer: flashcard.answer,
        showForm: true
      }
    case MSGS.SHOW_ANSWER_OF_FLASHCARD:
      return showAnswerOfFlashcard(msg, model)
    case MSGS.EDIT_RANKING_OF_FLASHCARD:
      return editRankingOfFlashcard(msg, model)
    default:
      return model;
  }
}

const addFlashcard = model => {
  const { question, answer, nextId, flashcards } = model;
  const flashcard = { id: nextId, question, answer, showAnswer: false, rank: 0 };
  return {
    ...model,
    flashcards: [...flashcards, flashcard],
    nextId: nextId + 1,
    question: '',
    answer: '',
    showForm: false
  };
};

const editFlashcard = model => {
  const { question, answer, editId } = model;
  const flashcards = R.map(
    flashcard => {
      if (flashcard.id === editId) {
        return { ...flashcard, question, answer, showAnswer: false }
      }
      return flashcard
    },
    model.flashcards
  )

  return {
    ...model,
    flashcards,
    question: '',
    answer: '',
    showForm: false
  };
};

const showAnswerOfFlashcard = (msg, model) => {
  const flashcards = R.map(
    flashcard => {
      if (flashcard.id === msg.flashcardId) {
        return { ...flashcard, showAnswer: !flashcard.showAnswer }
      }
      return flashcard
    },
    model.flashcards
  )

  return {
    ...model,
    flashcards,
    question: '',
    answer: '',
    showForm: false
  };
};

const editRankingOfFlashcard = (msg, model) => {
  const flashcards = R.map(
    flashcard => {
      if (flashcard.id === msg.flashcardId) {
        return { ...flashcard, rank: msg.rank }
      }
      return flashcard
    },
    model.flashcards
  )

  return {
    ...model,
    flashcards,
    question: '',
    answer: '',
    showForm: false
  };
}

export default update;
