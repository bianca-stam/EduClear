import {Component} from '@angular/core';
import {TestimonialCard} from "../testimonial-card/testimonial-card";

@Component({
    selector: 'app-testimonials',
    imports: [ TestimonialCard],
    templateUrl: './testimonials.html',
    styles: ``
})
export class Testimonials {
    testimonials = [
        {
            avatar: 'assets/images/users/user-1.jpg',
            name: 'Emily Carter',
            title: 'Fantastic experience!',
            description: 'The admin dashboard is intuitive, fast, and packed with useful features. Highly recommend it!',
            rating: 5
        },
        {
            avatar: 'assets/images/users/user-2.jpg',
            name: 'Michael Zhang',
            title: 'Excellent quality & support',
            description: 'The template’s quality is top-notch and the support team is quick to help. A truly seamless experience!',
            rating: 4.5
        },
        {
            avatar: 'assets/images/users/user-3.jpg',
            name: 'Sara Lopez',
            title: 'Outstanding experience',
            description: 'Everything from setup to customization was smooth and easy. The support team went above and beyond!',
            rating: 4
        },
    ];

    clients = [
        'assets/images/clients/01.svg',
        'assets/images/clients/02.svg',
        'assets/images/clients/03.svg',
        'assets/images/clients/04.svg',
        'assets/images/clients/05.svg',
        'assets/images/clients/06.svg',
        'assets/images/clients/07.svg'
    ];
}
