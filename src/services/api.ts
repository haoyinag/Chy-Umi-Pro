import request from "./interceptors";

const Methods = (method: string, url: string, params: any) => {
  return new Promise((resolve, reject) => {
    request[method](url, {
      ...params
    })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        console.log(error);

        reject(error);
      });
  });
};

const Get = (url: string, params?: any) => {
  return Methods("get", url, params);
};

const Post = (url: string, params: any) => {
  return Methods("post", url, params);
};

export { Get, Post };
