import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import {
    LucideAngularModule,
    LucideCircleDollarSign,
    LucideLayers,
    LucideSearch,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import {
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-search-results',
    imports: [
        PageTitle,
        LucideAngularModule,
        RouterLink,
        NgIcon,
        NgbPagination,
        NgbPaginationNext,
        NgbPaginationPrevious,
    ],
    templateUrl: './search-results.html',
    styles: ``,
})
export class SearchResults {
    searchIcon = LucideSearch;
    layerIcon = LucideLayers;
    dollarIcon = LucideCircleDollarSign;
}
