import { useCallback, useState } from 'react';

import Axios from 'axios';

const timeout = 300000;
const BASE_LINK = 'http://0.0.0.0:8080';

export default function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestResult, setRequestResult] = useState();

  const { isError, errorMessage } = error;

  const createParams = (obj)  => {
    if (obj) {
      let compiledParams = '?';

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          compiledParams += `${key}=${obj[key]}&`;
        }
      }
      compiledParams = compiledParams.slice(0, -1);
      return compiledParams;
    }
    return '';
  };

  const createRequest = async (link, params, body, method = 'get')=> {
      const headers = {
      'Content-type': 'application/json',
      Accept: 'application/json',
    };
    const axiosInstance = Axios.create({
      timeout,
      headers,
    });
    const fullLink = `${BASE_LINK}/${link}${createParams(params)}`;

    switch (method) {
      case 'get':
        return axiosInstance.get(fullLink);
      case 'post':
        return axiosInstance.post(fullLink, body);
      case 'put':
        return axiosInstance.put(fullLink, body);
      case 'patch':
        return axiosInstance.patch(fullLink, body);
      case 'delete':
        return axiosInstance.delete(fullLink, { data: body });
      default:
        return false;
    }
  };

  const apiRequest = async (link, params) => {
    try {
      const result = await createRequest(link, params);

      setIsSuccess(true);
      setRequestResult(result.data);
      setIsLoading(false);
    } catch (err) {
        setError({
          isError: true,
          errorMessage: err.response.data || 'Empty error data',
        });
        setIsLoading(false);
      }
    }

  const fetch = useCallback(
    (link, params) => {
      setError({ isError: false, errorMessage: '' });
      setIsLoading(true);
      apiRequest(link, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [],
  );

  return {
    isLoading, isError, errorMessage, isSuccess, fetch, requestResult,
  };
};