import React from 'react';

/**
 * backend target to http://localhost
 */
React.$urlHeader = 'http://localhost:8081'


/**
 * get the full url to the backService via the path
 * eg: /api/getvideourl --> /backService/api/getvideourl
 * @returns url
 */
React.$getUrl = (url) => React.$urlHeader + url


/**
 * get the img url from the video title
 * @returns return the img url
 */
React.$getImgUrl = (title) => {
    return 'https://kakajiu-public.oss-cn-beijing.aliyuncs.com/images/' + title + '.png';
}

/**
 * log the error code and error info in the console
 * usually use when the body status code return is not 0
 * @param  responseBody the response body get
 */
 React.$logCommonError = (responseBody) => {
    console.log('error code:' + responseBody.status);
    console.log('error info: ' + responseBody.error);
}

/**
 * log the crucial error in the console
 * usually use when the status is not 2xx or a runtime error
 * @param responseBody he response body get
 */
React.$logRuntimeError = (response) => {
    console.log('runtime error:' + response.status);
}