import {Component, Input} from '@angular/core';
import type {TestimonialType} from '../types';
import {Rating} from '@app/components/rating';

@Component({
    selector: 'app-testimonial-card',
    imports: [ Rating],
    templateUrl: './testimonial-card.html',
    styles: ``
})
export class TestimonialCard {
    @Input() testimonial!: TestimonialType
}
