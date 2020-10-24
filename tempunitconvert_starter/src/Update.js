import * as R from 'ramda';

const MSGS = {
  LEFT_INPUT: 'LEFT_INPUT',
  RIGHT_INPUT: 'RIGHT_INPUT',
  LEFT_UNIT: 'LEFT_UNIT',
  RIGHT_UNIT: 'RIGHT_UNIT'
}

export function leftInputMsg(leftValue) {
  return {
    type: MSGS.LEFT_INPUT,
    leftValue
  }
}

export function rightInputMsg(rightValue) {
  return {
    type: MSGS.RIGHT_INPUT,
    rightValue
  }
}

export function leftUnitMsg(leftUnit) {
  return {
    type: MSGS.LEFT_UNIT,
    leftUnit
  }
}

export function rightUnitMsg(rightUnit) {
  return {
    type: MSGS.RIGHT_UNIT,
    rightUnit
  }
}

const toInt = R.pipe(parseInt, R.defaultTo(0));

function update (msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_INPUT:
      if (msg.leftValue === '') {
        return { ...model, sourceLeft: true, leftValue: '', rightValue: '' }
      }
      const leftValue = toInt(msg.leftValue)
      return { ...model, sourceLeft: true, leftValue }
    case MSGS.RIGHT_INPUT:
      if (msg.rightValue === '') {
        return { ...model, sourceLeft: false, rightValue: '', leftValue: '' }
      }
      const rightValue = toInt(msg.rightValue)
      return { ...model, sourceLeft: false, rightValue }
    case MSGS.LEFT_UNIT:
      const { leftUnit } = msg
      return { ...model, leftUnit }
    case MSGS.RIGHT_UNIT:
      const { rightUnit } = msg
      return { ...model, rightUnit }
    default:
      return model
  }
}

export default update;

