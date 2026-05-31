import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';

export const COVER_ROUTES: Routes = [
    {
        path: 'auth-2/sign-in',
        component: SignIn,
        data: { title: "Sign In" },
    },
    {
        path: 'auth-2/sign-up',
        component: SignUp,
        data: { title: "Sign Up" },
    },
];

