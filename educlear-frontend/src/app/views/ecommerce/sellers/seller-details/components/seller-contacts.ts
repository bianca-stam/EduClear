import {Component, Input} from '@angular/core';
import {SellerType} from '@/app/views/ecommerce/sellers/types';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgIcon} from '@ng-icons/core';

@Component({
    selector: 'app-seller-contacts',
    imports: [NgbDropdownModule, NgIcon],
    template: `
        <div class="card card-top-sticky">
            <div class="card-body">
                <div
                    class="d-flex justify-content-between align-items-center rounded border-light p-2 bg-light-subtle border">
                    <div class="d-flex justify-content-start align-items-center gap-3">
                        <div class="avatar avatar-xl">
                            <img src="assets/images/sellers/1.png" alt="avatar" class="img-fluid rounded-circle"/>
                        </div>
                        <div>
                            <h5 class="text-nowrap fw-bold mb-1">MacHub Retailers</h5>
                            <p class="text-muted mb-0">Since 2017</p>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <div ngbDropdown placement="bottom-end">
                            <button
                                ngbDropdownToggle
                                class="btn btn-light btn-sm btn-icon drop-arrow-none">
                                <ng-icon name="tablerDots" class="fs-20"></ng-icon>
                            </button>
                            <div ngbDropdownMenu class="dropdown-menu-end">
                                <button ngbDropdownItem>Edit Profile</button>
                                <button ngbDropdownItem class="text-danger">Report</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-3">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <ng-icon name="tablerUser" class="fs-xl text-secondary"></ng-icon>
                        </div>
                        <p class="mb-0 fs-sm">
                            Owner: <span class="fw-semibold">Emily Carter</span>
                        </p>
                    </div>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <ng-icon name="tablerBriefcase" class="fs-xl text-secondary"></ng-icon>
                        </div>
                        <p class="mb-0 fs-sm">
                            Business Type: <span class="fw-semibold">Premium Apple Reseller</span>
                        </p>
                    </div>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <ng-icon name="tablerCalendarEvent" class="fs-xl text-secondary"></ng-icon>
                        </div>
                        <p class="mb-0 fs-sm">
                            Founded: <span class="fw-semibold">2017</span>
                        </p>
                    </div>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <ng-icon name="tablerMapPin" class="fs-xl text-secondary"></ng-icon>
                        </div>
                        <p class="mb-0 fs-sm">
                            Location: <span class="fw-semibold">San Francisco, CA</span>
                        </p>
                    </div>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <ng-icon name="tablerMail" class="fs-xl text-secondary"></ng-icon>
                        </div>
                        <p class="mb-0 fs-sm">
                            Support:
                            <a href="mailto:help@machubstore.com" class="text-primary fw-semibold">
                                help&#64;machubstore.com
                            </a>
                        </p>
                    </div>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                            <ng-icon name="tablerLink" class="fs-xl text-secondary"></ng-icon>
                        </div>
                        <p class="mb-0 fs-sm">
                            Website:
                            <a href="https://www.machubstore.com" target="_blank" class="text-primary fw-semibold">
                                www.machubstore.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="card-body border-top border-dashed">
                <h5 class="mb-3">Contact Seller</h5>
                <form>
                    <div class="mb-3">
            <textarea class="form-control" rows="4" placeholder="Enter your message..."
                      name="message"></textarea>
                    </div>
                    <div class="text-end">
                        <button class="btn btn-primary" type="submit">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    styles: ``
})
export class SellerContacts {
    @Input() seller!: SellerType
}
