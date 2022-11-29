/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
/**
 *
 * @param {string} url The full URL to update.
 * @param {object} parameters The parameter key value pairs to update. eg:
 * {paramKey: newParamValue}
 *
 * @returns {string} The updated URL.
 */
export default function setUrlParameters(url, parameters) {
  if (!url) {
    console.warn('[setUrlParameters]: no url provided');
    return;
  }
  if (!parameters) {
    console.warn('[setUrlParameters]: no parameters provided');
    return url;
  }

  const urlParts = url.split('?');
  const params = new URLSearchParams(urlParts[1]);

  for (const [key, value] of Object.entries(parameters)) {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  const paramsString = params.toString();

  return paramsString ? `${urlParts[0]}?${paramsString}` : urlParts[0];
}
