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

function calculateTipAndTotal(bill, tip) {
  const billAmount = parseFloat(bill)
  const tipAmount = parseFloat(tip)
  const calculatedTip = billAmount * (tipAmount / 100) || 0;
  const calculatedTotal = billAmount + calculatedTip;
  return [calculatedTip, calculatedTotal]
}

const toFloat = R.pipe(parseFloat, R.defaultTo(0))

function update (msg, model) {
  switch (msg.type) {
    case MSGS.BILL_INPUT:
      const bill = toFloat(msg.billInput)
      const [calculatedTip, calculatedTotal] = calculateTipAndTotal(bill, model.tip)
      return { ...model, bill, calculatedTip, calculatedTotal }
    case MSGS.TIP_INPUT:
      const tip = toFloat(msg.tipInput)
      const [calculatedTip2, calculatedTotal2] = calculateTipAndTotal(model.bill, tip)
      return { ...model, tip, calculatedTip: calculatedTip2, calculatedTotal: calculatedTotal2 }
    default:
      return model
  }
}

export default update;
