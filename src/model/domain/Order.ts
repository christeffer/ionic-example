export default class Order {
  type: string
  qty: number
  value: number

  constructor(
    type: string,
    qty: number,
    value: number
  ) {

    this.type = type
    this.qty = qty
    this.value = value
  }
}
