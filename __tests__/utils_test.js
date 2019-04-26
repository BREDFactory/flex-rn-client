/*
Copyright 2019-2020 BRED Banque Populaire

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
jest.useFakeTimers();

import React from "react";
import enzyme, { shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import { checkNavigation, goTo, getPlaces } from "../utils/utils";

class MockStorage {
  constructor(cache = {}) {
    this.storageCache = cache;
  }

  setItem = jest.fn((key, value) => {
    return new Promise((resolve, reject) => {
      return typeof key !== "string" || typeof value !== "string"
        ? reject(new Error("key and value must be string"))
        : resolve((this.storageCache[key] = value));
    });
  });

  getItem = jest.fn(key => {
    return new Promise(resolve => {
      return this.storageCache.hasOwnProperty(key)
        ? resolve(this.storageCache[key])
        : resolve(null);
    });
  });

  removeItem = jest.fn(key => {
    return new Promise((resolve, reject) => {
      return this.storageCache.hasOwnProperty(key)
        ? resolve(delete this.storageCache[key])
        : reject("No such key!");
    });
  });

  clear = jest.fn(key => {
    return new Promise((resolve, reject) => resolve((this.storageCache = {})));
  });

  getAllKeys = jest.fn(key => {
    return new Promise((resolve, reject) =>
      resolve(Object.keys(this.storageCache))
    );
  });
}

enzyme.configure({ adapter: new ReactSixteenAdapter() });

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);
const ctx = { props: { navigation: { navigate: jest.mock() } } };

jest.setMock("AsyncStorage", AsyncStorage);

describe("Testing utils", () => {
  it("renders correctly", () => {
    shallow(<checkNavigation ctx={ctx} str="Login" />);
    shallow(<goTo ctx={ctx} str="Login" />);
  });

  function last(arr) {
    return arr[arr.length - 1];
  };

  it("gets the places", done => {
    const data = ["data"];
    fetch = jest.fn(() => new Promise(resolve => resolve({ json: jest.fn(() => new Promise(resolve => resolve(data))) })));
    const setState = jest.fn();
    const mock = (ctx, x) => {
      expect(x).toEqual(data);
      expect(last(setState.mock.calls)[0]).toEqual({loading: false});
      done();
    };
    getPlaces({setState}, mock, null, true);
    expect(last(setState.mock.calls)[0]).toEqual({ loading: true });
    const element = ["element"];
    const mock2 = (ctx, x) => {
      expect(x).toEqual(element);
      expect(last(setState.mock.calls)[0]).toEqual({loading: false});
      done();
    };
    getPlaces({setState}, mock2, element, true);
    expect(last(setState.mock.calls)[0]).toEqual({ loading: true });
  });
});