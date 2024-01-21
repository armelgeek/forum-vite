import { requestMsg } from "./message";
import { deflateRaw } from "pako";

const defaultHeaders = {
  "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
};
export const httpFetch = (url:string, options = { method: "get" }) => {
  const requestObj = fetchData(url, options);

  return {
    promise: requestObj.request.catch((err) => {
      switch (err.message) {
        case "socket hang up":
          return Promise.reject(new Error(requestMsg.unachievable));
        case "Aborted":
          return Promise.reject(new Error(requestMsg.timeout));
        case "Network request failed":
          return Promise.reject(new Error(requestMsg.notConnectNetwork));
        default:
          return Promise.reject(err);
      }
    }),
    cancelHttp() {
      requestObj.abort();
    },
  };
};


export const httpGet = (url:string, options:any, callback:any) => {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  const requestObj = fetchData(url, { ...options, method: "get" });
  requestObj.request
      .then((resp) => {
        callback(null, resp, resp.body);
      })
      .catch((err) => {
        callback(err, null, null);
      });

  return () => {
    requestObj.abort();
  };
};

const handleDeflateRaw = (data:any) =>
    new Promise((resolve, reject) => {
      resolve(Buffer.from(deflateRaw(data)));
      // deflateRaw(data, (err, buf) => {
      //   if (err) return reject(err)
      //   resolve(buf)
      // })
    });

const regx = /(?:\d\w)+/g;

const handleRequestData = async (
    url,
    {
      method = "get",
      headers = {},
      format = "json",
      cache = "no-store",
      ...options
    }
) => {
  // console.log(url, options)
  headers = Object.assign(
      {
        Accept: "application/json",
      },
      headers
  );
  options.cache = cache;
  if (method.toLocaleLowerCase() === "post" && !headers["Content-Type"]) {
    if (options.form) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      const formBody = [];
      for (let [key, value] of Object.entries(options.form)) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(value);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
      options.body = formBody.join("&");
      delete options.form;
    } else if (options.formData) {
      headers["Content-Type"] = "multipart/form-data";
      const formBody = [];
      for (let [key, value] of Object.entries(options.form)) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(value);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
      options.body = options.formData;
      delete options.formData;
    } else {
      headers["Content-Type"] = "application/json";
    }
  }
  if (headers["Content-Type"] === "application/json" && options.body) {
    options.body = JSON.stringify(options.body);
  }
  
  return {
    ...options,
    method,
    headers: Object.assign({}, defaultHeaders, headers),
  };
};

// https://stackoverflow.com/a/64945178
const blobToBuffer = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const data = reader.result.slice(reader.result.indexOf("base64,") + 7);
      resolve(Buffer.from(data, "base64"));
    };
    reader.readAsDataURL(blob);
  });
};

const fetchData = (url, { timeout = 15000, ...options }) => {
  console.log("---start---", url);

  const controller = new AbortController();

  return {
    request: handleRequestData(url, options).then((options) => {
      return fetch(url, {
            ...options,
            signal: controller.signal,
          })
          .then((resp) =>
              (options.binary ? resp.blob() : resp.text()).then((text) => {
                // console.log(options, headers, text)
                // console.log('options',resp);
                return {
                  headers: resp.headers.map,
                  body: text,
                  statusCode: resp.status,
                  url: resp.url,
                  ok: resp.ok,
                };
              })
          )
          .then((resp) => {

            if (options.binary) {
              return blobToBuffer(resp.body).then((buffer) => {
                resp.body = buffer;
                return resp;
              });
            } else {
              try {
                resp.body = JSON.parse(resp.body);
              } catch {}

              return resp;
            }
          })
          .catch((err) => {
            //console.log(err, err.code, err.message);
            return Promise.reject(err);
          })
          .finally(() => {

          });
    }),
    abort() {
      controller.abort();
    },
  };
};