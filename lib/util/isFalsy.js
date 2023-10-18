/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

// Warning not checking for zero or NAN
export default function isFalsy(value) {
  return typeof value === 'undefined' || value === null || value === '';
}
