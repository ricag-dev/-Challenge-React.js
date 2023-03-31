import { ApiErrorHandler } from "@/core/shared/helpers/ApiErrorHandler";
import AuthService from "@/core/shared/services/AuthService";
import axiosRetry from "axios-retry";

/**
 * @interface ApiHeaders
 * @memberOf ApiService
 * @property Authorization {string} Authorization
 * @property Content-type {string} Content type
 */
export class ApiHeaders {
  Authorization;
  "Content-type";
}

/**
 * This interface describes the response from the API.
 *
 * The data object could vary for each endpoint, explaining the "any" type.
 *
 * @interface ApiHeaders
 * @memberOf ApiService
 * @property Authorization {string} Authorization
 * @property Content-type {string} Content type
 */
// eslint-disable-next-line
export class ApiResponse {
  data;
  ts;
}

/**
 * This interface describes the response from the API.
 *
 * The data object could vary for each endpoint, explaining the "any" type.
 *
 * @interface ApiHeaders
 * @memberOf ApiService
 * @property Authorization {string} Authorization
 * @property Content-type {string} Content type
 */
// eslint-disable-next-line
export class ApiSuccessResponse extends ApiResponse {}

/**
 * This interface describes the response from the API.
 *
 * The data object could vary for each endpoint, explaining the "any" type.
 *
 * @interface ApiHeaders
 * @memberOf ApiService
 * @property Authorization {string} Authorization
 * @property Content-type {string} Content type
 */
// eslint-disable-next-line
export class ApiErrorResponse extends ApiResponse {
  code;
  message;
}

/**
 * @class ApiService
 */
export class ApiService {
  static POST = "post";
  static GET = "get";
  static PUT = "put";
  static DELETE = "delete";

  /**
   * Fetch data using axios
   * @param method {string} Method (post, get, put, delete)
   * @param endpoint {string} URL Endpoint
   * @param data {any} Body params
   * @param headers {ApiHeaders} HTTP Headers
   * @param axiosRetryConfig Define the retry strategy
   * @param onRetry Callback when a retry is started
   * @param onUploadProgress
   * @return {Promise<ApiSuccessResponse>}
   */
  static async fetchData/*<ApiResponse>*/(
    method/*: string*/,
    endpoint/*: string*/,
    data/*?: Record<string, unknown> | FormData*/,
    headers/*?: ApiHeaders*/,
    axiosRetryConfig/*?: IAxiosRetryConfig*/,
    onRetry/*?: (retryCount: number) => void*/,
    onUploadProgress/*?: (event: ProgressEvent) => void*/
  )/*: Promise<ApiResponse> */ {
    const axios = await require("axios");
    const client = axios.create();
    if (axiosRetryConfig) {
      client.interceptors.request.use((config/*: AxiosRequestConfig*/) => {
        // axios-retry doesn't provide a full description of properties available.
        // eslint-disable-next-line
        const retryRequestData = (config)["axios-retry"];
        if (retryRequestData) {
          const retryCount = retryRequestData.retryCount;
          if (retryCount > 0 && onRetry === undefined) {
            //ConnectivityHandler.setOffline();
          } else if (retryCount > 0 && typeof onRetry === "function") {
            onRetry(retryCount);
          }
        }

        return config;
      });

      client.interceptors.response.use(
        (response/*: AxiosResponse*/) => {
         // if (!ConnectivityHandler.isOnline()) {
            //Enable connectivity if we have response without error
           // ConnectivityHandler.setOnline();
          //}
          return response;
        },
        (error/*: AxiosError*/) => {
          //if (!ConnectivityHandler.isOnline() && error.request.status > 0) {
            //Enable connectivity if we have response with any error
            //ConnectivityHandler.setOnline();
          //}
          throw error;
        }
      );

      axiosRetry(client, axiosRetryConfig);
    }
    const token = AuthService.getToken();
    if (token) {
      headers = {
        Authorization: `Bearer ${AuthService.getToken()}`,
        ...headers,
      };
    }
    return client({
      method: method,
      url: process.env.VUE_APP_API_URL + "/api/" + endpoint,
      data: data,
      headers: headers,
      onUploadProgress: onUploadProgress,
    })
      .then((response/*: AxiosResponse*/) => {
        return response.data;
      })
      .catch((error/*: AxiosError*/) => {
        ApiErrorHandler.handle(error.request);
      });
  }

  /**
   * Get
   * @param endpoint {string} Endpoint
   * @param onRetry Callback when a retry is started
   * @return {Promise<ApiSuccessResponse>}
   */
  static get/*<ApiResponse>*/(
    endpoint/*: string*/,
    onRetry/*?: (retryCount: number) => void*/
  )/*: Promise<ApiResponse>*/ {
    return ApiService.fetchData(
      ApiService.GET,
      endpoint,
      undefined,
      {},
      {
        retries: 10,
        retryDelay: (retryCount)/*: number*/ => {
          //Intervals in seconds
          const intervals = [5, 5, 10, 15, 30, 60, 180, 300, 600, 1200, 1800];
          return intervals[retryCount] * 1000;
        },
        retryCondition: (error)/*: boolean*/ => {
          // Only Network Error
          return error.code === undefined && error.response === undefined;
        },
      },
      onRetry
    );
  }

  /**
   * Post
   * @param endpoint {string} Endpoint
   * @param data {any} Body params
   * @param headers {ApiHeaders}
   * @param onUploadProgress
   * @return {Promise<ApiSuccessResponse>}
   */
  static post/*<ApiResponse>*/(
    endpoint/*: string */,
    data/*?: Record<string, unknown> | FormData */,
    headers/*?: ApiHeaders */,
    onUploadProgress/*?: (event: ProgressEvent) => void */
  )/*: Promise<ApiResponse> */{
    return ApiService.fetchData(
      ApiService.POST,
      endpoint,
      data,
      headers,
      undefined,
      undefined,
      onUploadProgress
    );
  }

  /**
   * Put
   * @param endpoint {string} Endpoint
   * @param data {any} Body params
   * @param headers {ApiHeaders}
   * @return {Promise<ApiSuccessResponse>}
   */
  static put/*<ApiResponse>*/(
    endpoint/*: string*/,
    data/*?: Record<string, unknown> | FormData*/,
    headers/*?: ApiHeaders*/
  )/*: Promise<ApiResponse>*/ {
    return ApiService.fetchData(ApiService.PUT, endpoint, data, headers);
  }

  /**
   * Delete
   * @param endpoint {string} Endpoint
   * @return {Promise<ApiSuccessResponse>}
   */
  static delete/*<ApiResponse>*/(endpoint/*: string*/)/*: Promise<ApiResponse>*/ {
    return ApiService.fetchData(ApiService.DELETE, endpoint);
  }
}


export class ApiServiceError extends Error{

  constructor(code,message,data) {

    super(message);

    this.code = code;
    this.data = data;
  }
  
}
export class UnauthorizedApiServiceError extends ApiServiceError{}
export class MaintenanceApiServiceError extends ApiServiceError{}
export class BadRequestApiServiceError extends ApiServiceError{}