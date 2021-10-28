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