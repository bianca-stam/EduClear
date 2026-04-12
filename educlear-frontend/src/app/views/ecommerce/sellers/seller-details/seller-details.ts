import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {
    SellerContacts
} from '@/app/views/ecommerce/sellers/seller-details/components/seller-contacts';
import {ActivatedRoute, Router} from '@angular/router';
import {SellerType} from '@/app/views/ecommerce/sellers/types';
import {sellers, sellerStatistics} from '@/app/views/ecommerce/sellers/data';
import {
    SellerOverview
} from '@/app/views/ecommerce/sellers/seller-details/components/seller-overview';
import {
    SellerProducts
} from '@/app/views/ecommerce/sellers/seller-details/components/seller-products';
import {
    SellerStatisticWidget
} from '@/app/views/ecommerce/sellers/seller-details/components/seller-statistic-widget';

@Component({
    selector: 'app-seller-details',
    imports: [
        PageTitle,
        SellerContacts,
        SellerOverview,
        SellerProducts,
        SellerStatisticWidget
    ],
    templateUrl: './seller-details.html',
    styles: ``
})
export class SellerDetails implements OnInit {
    sellerId!: SellerType['id'];
    seller!: SellerType

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/error/404']);
            return;
        }

        const matchedSeller = sellers.find(i => i.id.toString() === id);
        this.seller = matchedSeller as SellerType;
        if (matchedSeller) {
            this.sellerId = matchedSeller?.id;
        } else {
            this.router.navigate(['/error/404']);
        }
    }

    protected readonly sellerStatistics = sellerStatistics;
}
