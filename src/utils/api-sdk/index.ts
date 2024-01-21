import auth from './modules/auth';
const sdk = {
    loginHandle(email: any, password: any) {
        return auth.loginAuth(email, password);
    },
    registerHandle(username: any, email: any, password: any, confirmPassword: any, country:any) {
        return auth.registerUser(username, email, password, confirmPassword, country);
    },
    resetPasswordHandle(email: any) {
        return auth.resetPassword(email);
    },
    newPasswordHandle(email: any, code: any, newPassword: any) {
        return auth.newPassword(email, code, newPassword);
    },
    codeVerificationHandle(email: any, code: any) {
        return auth.codeVerification(email, code);
    },
    verifyAccountHandle(code: any, password: any) {
        return auth.verifyAccount(code, password);
    },
    regenerateVerifyCodeHandle(email: any) {
        return auth.regenerateVerifyCode(email);
    },
    refreshTokenHandle(token: any) {
        return auth.refreshTokenAuth(token);
    },
    updateProfileHandle(name: string, email: string, token: string) {
        return auth.updateProfile(name, email, token);
    },
    updateAdressHandle(country:any,state:any,address:any,token:string){
        return auth.updateAdress(country,state,address,token);
    },
    updatePasswordHandle(oldPassword: string, newPassword: string, confirmPassword: string, token: string) {
        return auth.updatePassword(oldPassword, newPassword, confirmPassword, token);
    },
    meInfoHandle(formData: any, token: any) {
        return auth.meInfo(formData, token);
    },
    updateAvatar(infos: any, accessToken: string) {
        return auth.updateAvatar(infos, accessToken);
    },
    getMeInfoHandle(token: any) {
        return auth.getMeInfo(token);
    },
    confirmUpdateEmail(confirmationId: any) {
        return auth.confirmUpdateEmail(confirmationId);
    },
    deleteAccountHandle(password: any, token: any) {
        return auth.deleteAccount(password, token);
    },
}
export default sdk;