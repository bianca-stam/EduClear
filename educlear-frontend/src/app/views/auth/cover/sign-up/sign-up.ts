import { credits, currentYear } from '@/app/constants';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PasswordStrengthBar } from "@app/components/password-strength-bar";
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChoiceSelectInputDirective } from '@core/directive/choices-select.directive';
import { LucideAngularModule, LucideCircleUser, LucideKeyRound, LucideMail, LucideShield } from "lucide-angular";
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-sign-up',
    host: { 'data-component-id': 'auth2-sign-up' },
    imports: [RouterLink, PasswordStrengthBar, FormsModule, LucideAngularModule, ChoiceSelectInputDirective, ReactiveFormsModule],
    templateUrl: './sign-up.html',
    styles: ``,
})
export class SignUp {
    currentYear = currentYear
    credits = credits

    private fb = inject(FormBuilder).nonNullable;
    private authService = inject(AuthService);
    private router = inject(Router);

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);

    loginForm = this.fb.group({
        nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
        correo: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
        password: ['', [Validators.required,Validators.minLength(3) ]],
        rol: ['alumno', Validators.required]
    });

    get form(){ return this.loginForm.controls }

    signUp() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const formValues = this.loginForm.getRawValue();
    const newUser = {
      nombreCompleto: formValues.nombreCompleto,
      email: formValues.correo,
      contrasena: formValues.password,
      rol: formValues.rol
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        this.isLoading.set(false);
        // Despues de registrarse exitosamente, navegar a login (o auto-login)
        this.router.navigate(['/auth-2/sign-in']);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message ?? 'Error al registrar el usuario.');
      }
    });
  }


    protected readonly LucideCircleUser = LucideCircleUser;
    protected readonly LucideMail = LucideMail;
    protected readonly LucideKeyRound = LucideKeyRound;
    protected readonly LucideShield = LucideShield;



}
