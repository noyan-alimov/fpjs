import * as R from 'ramda';

const MSGS = {
  BILL_INPUT: 'BILL_INPUT',
  TIP_INPUT: 'TIP_INPUT',
};

export function billInputMsg(billInput) {
  return {
    type: MSGS.BILL_INPUT,
    billInput
  }
}

export function tipInputMsg(tipInput) {
  return {
    type: MSGS.TIP_INPUT,
    tipInput
  }
}

const toInt = R.pipe(parseInt, R.defaultTo(0))

function update (msg, model) {
  switch (msg.type) {
    case MSGS.BILL_INPUT:
      const bill = toInt(msg.billInput)
      return { ...model, bill }
    case MSGS.TIP_INPUT:
      const tipInt = toInt(msg.tipInput)
      const calculatedTip = model.bill * (tipInt / 100)
      const calculatedTotal = model.bill + calculatedTip
      return { ...model, tip: tipInt, calculatedTip, calculatedTotal }
    default:
      return model
  }
}

export default update;
