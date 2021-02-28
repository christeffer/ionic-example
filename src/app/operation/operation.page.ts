import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Order from '../../model/domain/Order';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
export class OperationPage implements OnInit {
  operationType = null;
  totalExchanges = 100;
  exchangeValue = 10.00;
  orders = null;
  isCreatingOrder = false;
  order: Order = {
    type: '',
    qty: null,
    value: null,
  };

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.operationType = this.activatedRoute.snapshot.paramMap.get('operationType');
    this.order.type = this.operationType;
    this.exchangeValue = this.operationType === 'sell' ? 15.00 : 20.00;
    this.orders = [
      {
        type: this.operationType,
        qty: 20,
        value: this.operationType === 'sell' ? 9.00 : 20.00,
      },
      {
        type: this.operationType,
        qty: 30,
        value: this.operationType === 'sell' ? 9.00 : 20.00,
      },
    ]
  }

  newOrder() {
    this.isCreatingOrder = true;
  }

  cancelNewOrder() {
    this.isCreatingOrder = false;
  }
  calcMaxSell(){
    let maxSell = this.totalExchanges;
    this.orders.map(order => {
      maxSell = maxSell - order.qty;
    });
    return maxSell;
  }

  initialValues(){
    this.isCreatingOrder = false;
    this.order = {
      type: '',
      qty: null,
      value: null,
    };
  }

  createOrder(){
    if (this.order.type === 'sell') {
      const maxExchangeSell = this.calcMaxSell();
      if(maxExchangeSell < this.order.qty) {
        alert('Quantidade de ações em ordem de venda + quantidade da ordem maior do que o total de ações');
        return;
      }
    }
    this.orders.push(this.order);
    this.initialValues();

  }

}
