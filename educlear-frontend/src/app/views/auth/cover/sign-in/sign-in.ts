import { credits, currentYear } from '@/app/constants';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

import { LucideCircleUser, LucideAngularModule, LucideKeyRound } from 'lucide-angular';

@Component({
    selector: 'app-sign-in',
    host: { 'data-component-id': 'auth2-sign-in' },
    imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
    templateUrl: './sign-in.html',
    styles: [`
        .is-invalid {
            border-color: var(--ins-secondary, #FCAC55) !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23FCAC55'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23FCAC55' stroke='none'/%3e%3c/svg%3e") !important;
        }
        .is-invalid:focus {
            border-color: var(--ins-secondary, #FCAC55) !important;
            box-shadow: 0 0 0 0.25rem rgba(252, 172, 85, 0.25) !important;
        }
    `],
})
export class SignIn {
    currentYear = currentYear
    credits = credits

    private fb = inject(FormBuilder).nonNullable;
    private authService = inject(AuthService);
    private router = inject(Router);

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);

    loginForm = this.fb.group({
        correo: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
        password: ['', [Validators.required,Validators.minLength(3) ]]
    });

    get form(){ return this.loginForm.controls }

    logIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/cursos']);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message ?? 'Error al iniciar sesión. Verifica tus credenciales.');
        this.form.password.reset();
      }
    });
  }

    protected readonly LucideCircleUser = LucideCircleUser;
    protected readonly LucideKeyRound = LucideKeyRound;
}
