import {Routes} from '@angular/router';
import {Products} from '@/app/views/ecommerce/products/products/products';
import {Grid} from '@/app/views/ecommerce/products/grid/grid';
import {Details} from '@/app/views/ecommerce/products/details/details';
import {Add} from '@/app/views/ecommerce/products/add/add';
import {Categories} from '@/app/views/ecommerce/categories/categories';
import {Orders} from '@/app/views/ecommerce/orders/orders';
import {OrderDetails} from '@/app/views/ecommerce/orders/order-details/order-details';
import {Customers} from '@/app/views/ecommerce/customers/customers';
import {Sellers} from '@/app/views/ecommerce/sellers/sellers';
import {SellerDetails} from '@/app/views/ecommerce/sellers/seller-details/seller-details';
import {ProductReviews} from '@/app/views/ecommerce/product-reviews/product-reviews';



export const ECOMMERCE_ROUTES: Routes = [
    {
        path: 'ecommerce/products',
        component: Products,
        data: {title: "Products"},
    },
    {
        path: 'ecommerce/products/grid',
        component: Grid,
        data: {title: "Products Grid"},
    },
    {
        path: 'ecommerce/products/add',
        component: Add,
        data: {title: "Create New Products"},
    },
    {
        path: 'ecommerce/products/:id',
        component: Details,
        data: {title: "Products Details"},
    },
    {
        path: 'ecommerce/categories',
        component: Categories,
        data: {title: "Categories"},
    },
    {
        path: 'ecommerce/orders',
        component: Orders,
        data: {title: "Orders"},
    },
    {
        path: 'ecommerce/orders/:id',
        component: OrderDetails,
        data: {title: "Orders Details"},
    },
    {
        path: 'ecommerce/customers',
        component: Customers,
        data: {title: "Customers"},
    },
    {
        path: 'ecommerce/sellers',
        component: Sellers,
        data: {title: "Sellers"},
    },
    {
        path: 'ecommerce/sellers/:id',
        component: SellerDetails,
        data: {title: "Sellers Details"},
    },
    {
        path: 'ecommerce/reviews',
        component: ProductReviews,
        data: {title: "Reviews"},
    },
]
