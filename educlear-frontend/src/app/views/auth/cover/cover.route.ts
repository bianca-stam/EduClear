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
    {
        path: 'auth-2/reset-pw',
        component: ResetPw,
        data: { title: "Reset Password" },
    },
    {
        path: 'auth-2/new-pw',
        component: NewPw,
        data: { title: "New Password" },
    },
    {
        path: 'auth-2/two-factor',
        component: TwoFactor,
        data: { title: "Two Factor" },
    },
    {
        path: 'auth-2/lock-screen',
        component: LockScreen,
        data: { title: "Lock Screen" },
    },
    {
        path: 'auth-2/success-mail',
        component: SuccessMail,
        data: { title: "Success Mail" },
    },
    {
        path: 'auth-2/login-pin',
        component: LoginPin,
        data: { title: "Login with Pin" },
    },
    {
        path: 'auth-2/delete-account',
        component: DeleteAccount,
        data: { title: "Delete Account" },
    },


];
