/**
* Fetches to the backend and directs results to proper function for processing
*
* @param  {string} method - Request method
* @param  {object} data - Todo object
* @param  {function} cb - Callback function for returned data
*/
export function api(method, data, cb, type) {
  const promise = getApiPromise(method, data, type);

  promise.then(json => {
    if (typeof cb === 'function') {
      cb(json);
    }
  })
  .catch(err => {
    console.log('error:', err);
  });
}

/**
 * HTML request to the backend
 * @param  {string} method - Request method
 * @param  {object} data - Todo object
 *
 * @returns {promise} - Promise from the fetch request to the backend
 */
export function getApiPromise(method, data, type) {
  let url = 'http://localhost:3000/todos';
  if (['DELETE', 'PUT'].indexOf(method) !== -1) {
    let addType = (type && (type == "archive" || type == "complete" || type == "archiveall" || type == "completeall")) ? "/" + type : '';
    url += `/${data.id}` + addType;
  }

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (data) {
    options.body = JSON.stringify({
      data
    });
  }

  return fetch(url, options)
  .then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message));
    }

    return response.json();
  })
};
