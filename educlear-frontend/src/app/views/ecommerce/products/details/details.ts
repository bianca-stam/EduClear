import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {Reviews} from '@/app/views/ecommerce/products/details/components/reviews';
import {ProductType} from '@/app/views/ecommerce/products/types';
import {products} from '@/app/views/ecommerce/products/data';
import {Rating} from '@app/components/rating';
import {currency} from '@/app/constants';
import {toTitleCase} from '@/app/utils/string-utils';

@Component({
    selector: 'app-details',
    imports: [
        PageTitle,
        NgbCarouselModule,
        RouterLink,
        NgIcon,
        Reviews,
        Rating
    ],
    templateUrl: './details.html',
    styles: ``
})
export class Details implements OnInit {
    productId!: ProductType['sku'];
    product!: ProductType

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/error/404']);
            return;
        }

        const matchedProduct = products.find(i => i.sku === id);
        if (matchedProduct) {
            this.product = matchedProduct as ProductType;
            this.productId = matchedProduct?.sku;
        } else {
            this.router.navigate(['/error/404']);
        }
    }


    getDiscountPercentage(price: number, sellPrice: number): number {
        if (!price || !sellPrice || price <= sellPrice) return 0;
        const discount = ((price - sellPrice) / price) * 100;
        return Math.round(discount);
    }

    images = [
        'assets/images/products/7.png',
        'assets/images/products/11.png',
        'assets/images/products/12.png',
    ];

    protected readonly currency = currency;
    protected readonly toTitleCase = toTitleCase;
}
