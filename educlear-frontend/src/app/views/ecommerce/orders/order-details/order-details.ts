import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {OrderSummary} from '@/app/views/ecommerce/orders/order-details/components/order-summary';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderType} from '@/app/views/ecommerce/orders/types';
import {orders} from '@/app/views/ecommerce/orders/data';
import {
    ShippingActivity
} from '@/app/views/ecommerce/orders/order-details/components/shipping-activity';
import {CustomerDetail} from '@/app/views/ecommerce/orders/order-details/components/customer-detail';
import {
    ShippingAddress
} from '@/app/views/ecommerce/orders/order-details/components/shipping-address';
import {BillingDetails} from '@/app/views/ecommerce/orders/order-details/components/billing-details';

@Component({
  selector: 'app-order-details',
    imports: [
        PageTitle,
        OrderSummary,
        ShippingActivity,
        CustomerDetail,
        ShippingAddress,
        BillingDetails
    ],
  templateUrl: './order-details.html',
  styles: ``
})
export class OrderDetails implements OnInit {

    orderId!: OrderType['id'];
    order!: OrderType

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/error/404']);
            return;
        }

        const matchedOrder = orders.find(i => i.id === id);
        this.order = matchedOrder as OrderType;
        if (matchedOrder) {
            this.orderId = matchedOrder?.id;
        } else {
            this.router.navigate(['/error/404']);
        }
    }

}
