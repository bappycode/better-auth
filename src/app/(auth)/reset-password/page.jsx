import React, { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';

const ResetPassword = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm></ResetPasswordForm>
            </Suspense>
        </div>
    );
};

export default ResetPassword;