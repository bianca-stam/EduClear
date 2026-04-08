import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';
import { ResetPw } from './reset-pw/reset-pw';
import { NewPw } from './new-pw/new-pw';
import { TwoFactor } from './two-factor/two-factor';
import { LockScreen } from './lock-screen/lock-screen';
import { SuccessMail } from './success-mail/success-mail';
import { LoginPin } from './login-pin/login-pin';
import { DeleteAccount } from './delete-account/delete-account';


export const BASIC_ROUTES: Routes = [
    {
        path: 'auth/sign-in',
        component: SignIn,
        data: { title: "Sign In" },
    },
    {
        path: 'auth/sign-up',
        component: SignUp,
        data: { title: "Create New Account" },
    },
    {
        path: 'auth/reset-pw',
        component: ResetPw,
        data: { title: "Reset Password" },
    },
    {
        path: 'auth/new-pw',
        component: NewPw,
        data: { title: "New Password" },
    },
    {
        path: 'auth/two-factor',
        component: TwoFactor,
        data: { title: "Two Factor Authentication" },
    },
    {
        path: 'auth/lock-screen',
        component: LockScreen,
        data: { title: "Lock Screen" },
    },
    {
        path: 'auth/success-mail',
        component: SuccessMail,
        data: { title: "Success Mail" },
    },
    {
        path: 'auth/login-pin',
        component: LoginPin,
        data: { title: "Login with Pin" },
    },
    {
        path: 'auth/delete-account',
        component: DeleteAccount,
        data: { title: "Delete Account" },
    },
];
