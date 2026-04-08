import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-settings',
    imports: [
        NgIcon,
        RouterLink,
    ],
  template: `
      <form>

          <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light text-center">
              <ng-icon name="tablerUserCircle" class="me-1"/> Personal Info</h5>
          <div class="row">
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="firstname" class="form-label">First Name</label>
                      <input type="text" class="form-control" id="firstname"
                             placeholder="Enter first name">
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="lastname" class="form-label">Last Name</label>
                      <input type="text" class="form-control" id="lastname"
                             placeholder="Enter last name">
                  </div>
              </div>
          </div>

          <div class="row">
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="jobtitle" class="form-label">Job Title</label>
                      <input type="text" class="form-control" id="jobtitle"
                             placeholder="e.g. UI Developer, Designer">
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="phone" class="form-label">Phone Number</label>
                      <input type="text" class="form-control" id="phone" placeholder="+1 234 567 8901">
                  </div>
              </div>
          </div>

          <div class="mb-3">
              <label for="userbio" class="form-label">Bio</label>
              <textarea class="form-control" id="userbio" rows="4"
                        placeholder="Write something about yourself..."></textarea>
          </div>

          <div class="row">
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="useremail" class="form-label">Email Address</label>
                      <input type="email" class="form-control" id="useremail" placeholder="Enter email">
                      <span class="form-text fs-xs fst-italic text-muted"><a [routerLink]="['.']"
                                                                             class="link-reset">Click here to change your email</a></span>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="userpassword" class="form-label">Password</label>
                      <input type="password" class="form-control" id="userpassword"
                             placeholder="Enter new password">
                      <span class="form-text fs-xs fst-italic text-muted"><a [routerLink]="['.']"
                                                                             class="link-reset">Click here to change your password</a></span>
                  </div>
              </div>
          </div>

          <div class="mb-4">
              <label for="profilephoto" class="form-label">Profile Photo</label>
              <input class="form-control" type="file" id="profilephoto">
          </div>


          <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light text-center">
              <ng-icon name="tablerMapPin" class="me-1"/> Address Info
          </h5>
          <div class="row">
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="address-line1" class="form-label">Address Line 1</label>
                      <input type="text" class="form-control" id="address-line1"
                             placeholder="Street, Apartment, Unit, etc.">
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="address-line2" class="form-label">Address Line 2</label>
                      <input type="text" class="form-control" id="address-line2" placeholder="Optional">
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-4">
                  <div class="mb-3">
                      <label for="city" class="form-label">City</label>
                      <input type="text" class="form-control" id="city" placeholder="City">
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="mb-3">
                      <label for="state" class="form-label">State / Province</label>
                      <input type="text" class="form-control" id="state"
                             placeholder="State or Province">
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="mb-3">
                      <label for="zipcode" class="form-label">Postal / ZIP Code</label>
                      <input type="text" class="form-control" id="zipcode" placeholder="Postal Code">
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="country" class="form-label">Country</label>
                      <input type="text" class="form-control" id="country" placeholder="Country">
                  </div>
              </div>
          </div>


          <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light text-center">
              <ng-icon name="tablerBuildingSkyscraper" class="me-1"></ng-icon> Company Info</h5>
          <div class="row">
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="companyname" class="form-label">Company Name</label>
                      <input type="text" class="form-control" id="companyname"
                             placeholder="Enter company name">
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="mb-3">
                      <label for="cwebsite" class="form-label">Website</label>
                      <input type="text" class="form-control" id="cwebsite"
                             placeholder="https://yourcompany.com">
                  </div>
              </div>
          </div>


          <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light text-center">
              <ng-icon name="tablerWorld" class="me-1"/> Social</h5>
          <div class="row g-3">
              <div class="col-md-6">
                  <label for="social-fb" class="form-label">Facebook</label>
                  <div class="input-group">
                      <span class="input-group-text"><ng-icon name="tablerBrandFacebook"/></span>
                      <input type="text" class="form-control" id="social-fb" placeholder="Facebook URL">
                  </div>
              </div>
              <div class="col-md-6">
                  <label for="social-tw" class="form-label">Twitter X</label>
                  <div class="input-group">
                      <span class="input-group-text"><ng-icon name="tablerBrandX" /></span>
                      <input type="text" class="form-control" id="social-tw" placeholder="@username">
                  </div>
              </div>
              <div class="col-md-6">
                  <label for="social-insta" class="form-label">Instagram</label>
                  <div class="input-group">
                      <span class="input-group-text"><ng-icon name="tablerBrandInstagram"/></span>
                      <input type="text" class="form-control" id="social-insta"
                             placeholder="Instagram URL">
                  </div>
              </div>
              <div class="col-md-6">
                  <label for="social-lin" class="form-label">LinkedIn</label>
                  <div class="input-group">
                      <span class="input-group-text"><ng-icon name="tablerBrandLinkedin"/></span>
                      <input type="text" class="form-control" id="social-lin"
                             placeholder="LinkedIn Profile">
                  </div>
              </div>
              <div class="col-md-6">
                  <label for="social-gh" class="form-label">GitHub</label>
                  <div class="input-group">
                      <span class="input-group-text"><ng-icon name="tablerBrandGithub"/></span>
                      <input type="text" class="form-control" id="social-gh"
                             placeholder="GitHub Username">
                  </div>
              </div>
              <div class="col-md-6">
                  <label for="social-sky" class="form-label">Skype</label>
                  <div class="input-group">
                      <span class="input-group-text"><ng-icon name="tablerBrandSkype"/></span>
                      <input type="text" class="form-control" id="social-sky" placeholder="@username">
                  </div>
              </div>
          </div>


          <div class="text-end mt-4">
              <button type="submit" class="btn btn-success"><ng-icon name="tablerDeviceFloppy" class="me-1"/>
                  Save Changes
              </button>
          </div>
      </form>
  `,
  styles: ``
})
export class Settings {

}
