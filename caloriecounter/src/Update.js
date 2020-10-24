import * as R from 'ramda';

const MSGS = {
    SHOW_FORM: 'SHOW_FORM',
    MEAL_INPUT: 'MEAL_INPUT',
    CALORIES_INPUT: 'CALORIES_INPUT',
    SAVE_MEAL: 'SAVE_MEAL'
};

export function showFormMsg(showForm) {
    return {
        type: MSGS.SHOW_FORM,
        showForm
    }
}

export function mealInputMsg(description) {
    return {
        type: MSGS.MEAL_INPUT,
        description
    }
}

export function caloriesInputMsg(calories) {
    return {
        type: MSGS.CALORIES_INPUT,
        calories
    }
}

export function saveMealMsg() {
    return {
        type: MSGS.SAVE_MEAL
    }
}

function update(msg, model) {
    switch (msg.type) {
        case MSGS.SHOW_FORM:
            return { ...model, showForm: msg.showForm, description: '', calories: 0 }
        case MSGS.MEAL_INPUT:
            return { ...model, description: msg.description }
        case MSGS.CALORIES_INPUT:
            const calories = R.pipe(
                parseInt,
                R.defaultTo(0)
            )(msg.calories)
            return { ...model, calories }
        case MSGS.SAVE_MEAL:
            return add(msg, model)
        default:
            return model;
    }
}

function add(msg, model) {
    const { nextId, description, calories, meals } = model
    const meal = { id: nextId, description, calories }
    return {
        ...model,
        meals: [...meals, meal],
        nextId: nextId + 1,
        description: '',
        calories: 0,
        showForm: false
    }
}

export default update;