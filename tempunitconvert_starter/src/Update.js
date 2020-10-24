import * as R from 'ramda';

const MSGS = {
  LEFT_INPUT: 'LEFT_INPUT',
  RIGHT_INPUT: 'RIGHT_INPUT',
  LEFT_UNIT: 'LEFT_UNIT',
  RIGHT_UNIT: 'RIGHT_UNIT'
}

function FtoC(temp) {
  return 5 / 9 * (temp - 32)
}

function CtoF(temp) {
  return 9 / 5 * temp + 32
}

function KtoC(temp) {
  return temp - 237.15
}

function CtoK(temp) {
  return temp + 237.15
}

const FtoK = R.pipe(FtoC, CtoK)
const KtoF = R.pipe(KtoC, CtoF)

const unitConversions = {
  Celsius: {
    Fahrenheit: CtoF,
    Kelvin: CtoK
  },
  Fahrenheit: {
    Celsius: FtoC,
    Kelvin: FtoK
  },
  Kelvin: {
    Celsius: KtoC,
    Fahrenheit: KtoF
  }
}

function convertFromToTemp(fromUnit, fromTemp, toUnit) {
  const convertFn = R.pathOr(
    R.identity,
    [fromUnit, toUnit],
    unitConversions
  );
  return convertFn(fromTemp)
}

function convert(model) {
  const { leftValue, leftUnit, rightValue, rightUnit } = model

  const [fromUnit, fromTemp, toUnit] = 
    model.sourceLeft ?
    [leftUnit, leftValue, rightUnit] :
    [rightUnit, rightValue, leftUnit]

  const otherValue = convertFromToTemp(fromUnit, fromTemp, toUnit)

  return model.sourceLeft ?
    { ...model, rightValue: otherValue } :
    { ...model, leftValue: otherValue }
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
      return convert({ ...model, sourceLeft: true, leftValue })
    case MSGS.RIGHT_INPUT:
      if (msg.rightValue === '') {
        return { ...model, sourceLeft: false, rightValue: '', leftValue: '' }
      }
      const rightValue = toInt(msg.rightValue)
      return convert({ ...model, sourceLeft: false, rightValue })
    case MSGS.LEFT_UNIT:
      const { leftUnit } = msg
      return convert({ ...model, leftUnit })
    case MSGS.RIGHT_UNIT:
      const { rightUnit } = msg
      return convert({ ...model, rightUnit })
    default:
      return model
  }
}

export default update;

