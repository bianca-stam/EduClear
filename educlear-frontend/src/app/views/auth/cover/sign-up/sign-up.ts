import { credits, currentYear } from '@/app/constants';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PasswordStrengthBar } from "@app/components/password-strength-bar";
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChoiceSelectInputDirective } from '@core/directive/choices-select.directive';
import { LucideAngularModule, LucideCircleUser, LucideKeyRound, LucideMail, LucideShield } from "lucide-angular";
import { AuthService } from '@core/services/auth.service';
import { CursosService } from '@core/services/cursos.service';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { DbCurso } from '@core/models/db-models';
import { switchMap, of } from 'rxjs';

@Component({
    selector: 'app-sign-up',
    host: { 'data-component-id': 'auth2-sign-up' },
    imports: [RouterLink, PasswordStrengthBar, FormsModule, LucideAngularModule, ChoiceSelectInputDirective, ReactiveFormsModule],
    templateUrl: './sign-up.html',
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
export class SignUp implements OnInit {
    currentYear = currentYear
    credits = credits

    private fb = inject(FormBuilder).nonNullable;
    private authService = inject(AuthService);
    private cursosService = inject(CursosService);
    private asignaturasService = inject(AsignaturasService);
    private router = inject(Router);

    // ── Estado ───────────────────────────────────────────────────────────────
    cursos = signal<DbCurso[]>([]);

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);

    opcionesCurso = computed(() => ({
        searchEnabled: true,
        itemSelectText: '',
        choices: [
            { value: '', label: '— Sin curso asignado —', disabled: false, selected: !this.loginForm?.value?.cursoId },
            ...this.cursos().map(c => ({
                value: c.id_curso.toString(),
                label: c.nombre,
                selected: Number(this.loginForm?.value?.cursoId) === c.id_curso
            }))
        ]
    }));

    loginForm = this.fb.group({
        nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
        correo: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
        password: ['', [Validators.required,Validators.minLength(3) ]],
        rol: ['alumno', Validators.required],
        cursoId: [null as number | null]
    });

    // ── Lifecycle ─────────────────────────────────────────────────────────────
    ngOnInit() {
        this.cursosService.getAllCursos().subscribe({
            next: (data) => this.cursos.set(data),
            error: (err) => console.error('Error al cargar cursos para el registro:', err)
        });
    }

    get form(){ return this.loginForm.controls }

    signUp() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const formValues = this.loginForm.getRawValue();
    const cursoId = formValues.cursoId ? Number(formValues.cursoId) : null;

    const newUser = {
      nombreCompleto: formValues.nombreCompleto,
      email: formValues.correo,
      contrasena: formValues.password,
      rol: formValues.rol
    };

    this.authService.register(newUser).pipe(
      switchMap(usuarioCreado => {
        if (cursoId && usuarioCreado.id) {
          return this.asignaturasService.matricularEnCurso(cursoId, usuarioCreado.id);
        }
        return of(undefined);
      })
    ).subscribe({
      next: () => {
        this.isLoading.set(false);
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
