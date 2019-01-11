jest.useFakeTimers();

import React from "react";
import enzyme, { shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import { checkNavigation, goTo, sendToServ } from "../utils/utils";

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

it("renders correctly", () => {
  shallow(<checkNavigation ctx={ctx} str="Login" />);
  shallow(<goTo ctx={ctx} str="Login" />);
  shallow(<sendToServ ctx={ctx} json="" />);
});
