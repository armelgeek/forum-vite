import { apiPrefix } from "../../../config/constant";
import { timeout } from "../options";
import { httpFetch } from "../request";
export default {
  loginAuth(email: string, password: string) {

    const target_url = `${apiPrefix.baseUrl}/login`;

    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email, password }
    }) as any;
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {

      return statusCode == 200
        ? Promise.resolve({
          accessToken: body.accessToken,
          refreshToken: body.refreshToken,
          isVerified: body.isVerified,
        })
        : Promise.reject({
          statusCode: statusCode,
          message: body.message,
        });
    }).catch((err: any) => {
      Promise.reject({
        statusCode: err.statusCode,
        message: err.message,
      });
    });
    return requestObj;
  },
  refreshTokenAuth(token: any) {
    const target_url = `${apiPrefix.baseUrl}/refresh-token`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: {
        refreshToken: token,
      },
    }) as any;
    requestObj.promise = requestObj.promise
      .then(({ body, statusCode }: any) => {
        const { token } = body;
        return { accessToken: token };
      })
      .catch((err: any) => {
        Promise.reject({
          statusCode: err.statusCode,
          message: err.message,
        });
      });
    return requestObj;
  },
  meInfo(formData: any, token: string) {
    const target_url = `${apiPrefix.baseUrl}/me`;
    const requestObj = httpFetch(target_url, {
      method: "put",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      body: {
        email: formData.email,
        name: formData.name,
      },
    });
    requestObj.promise = requestObj.promise
      .then(({ body, statusCode }: any) => {
        const { message, token } = body;
        return Promise.resolve({
          message,
          token,
        });
      })
      .catch((err: any) => {
        console.log("erro auth", err);
        Promise.reject({
          statusCode: err.statusCode,
          message: err.message,
        });
      });
    return requestObj;
  },
  getMeInfo(token: string) {
    const target_url = `${apiPrefix.baseUrl}/me`;
    //console.log('get user',token);
    const requestObj = httpFetch(target_url, {
      method: "get",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
    }) as any;
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {

      return Promise.resolve({
        ...body, country: JSON.parse(body.country)

      });
    }).catch((err: any) => {
      Promise.reject({
        statusCode: err.statusCode,
        message: err.message,
      });
    });
    return requestObj;
  },
  registerUser(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    country: any
  ) {
    const target_url = `${apiPrefix.baseUrl}/register`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: {
        username, email, password, confirmPassword, country: JSON.stringify({
          id: country.id,
          name: country.name,
          region: country.region
        })
      },
    });
    requestObj.promise = requestObj.promise
      .then(({ body, statusCode }: any) => {
        return Promise.resolve(body);
      })
      .catch((err: any) => Promise.reject(new Error(err.message)));
    return requestObj;
  },
  resetPassword(email: string) {
    const target_url = `http://${apiPrefix.baseUrl}//password/reset`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return body;
    });
    return requestObj;
  },
  newPassword(email: string, code: string, newPassword: string) {
    const target_url = `${apiPrefix.baseUrl}/password/new`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email, code, newPassword },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return body;
    });
    return requestObj;
  },
  codeVerification(email: string, code: string) {
    const target_url = `${apiPrefix.baseUrl}/password/reset/verify`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email, code },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  verifyAccount(code: string, password: string) {
    const target_url = `${apiPrefix.baseUrl}/verify`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { code, password },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  regenerateVerifyCode(email: string) {
    const target_url = `${apiPrefix.baseUrl}/regenerate/verify/code`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  updateProfile(name: string, email: string, token: string) {
    const target_url = `${apiPrefix.baseUrl}/me`;
    const requestObj = httpFetch(target_url, {
      method: "put",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      body: { name: name, email: email },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  updateAdress(country: any, state: any, address: any, token: string) {
    const target_url = `${apiPrefix.baseUrl}/update_address`;
    const requestObj = httpFetch(target_url, {
      method: "put",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      body: { country: JSON.stringify(country), state: JSON.stringify(state), address },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  confirmUpdateEmail(confirmationId: any) {
    const target_url = `${apiPrefix.baseUrl}/email/confirmation`;
    const requestObj = httpFetch(target_url, {
      method: "put",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { confirmationId: confirmationId },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  updatePassword(oldPassword: any, newPassword: any, confirmPassword: any, token: any) {
    const target_url = `${apiPrefix.baseUrl}/change-password`;
    const requestObj = httpFetch(target_url, {
      method: "put",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      body: { oldPassword, newPassword, confirmPassword },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  deleteAccount(password: string, token: string) {
    const target_url = `${apiPrefix.baseUrl}/delete-account`;
    const requestObj = httpFetch(target_url, {
      method: "delete",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      body: { password },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  updateAvatar(file: any, token: string) {
    const apiUrl = `${apiPrefix.baseUrl}/profilePicture`;

    let formData = new FormData()
    formData.append('file', file)
    const requestObj: any = httpFetch(apiUrl, {
      method: "put",
      timeout,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }: any) => {
      return Promise.resolve(body)
    }).catch((err: any) => Promise.reject(new Error(err.message)));
    return requestObj;
  },
};