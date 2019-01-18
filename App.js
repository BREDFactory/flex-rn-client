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
import React from "react";
import NavigationApp from "./Navigation/NavigationApp";
import config from "./config/api";
import server from "./config/server";
import { pushNotifications } from "./utils/services/index";

pushNotifications.configure();

export default class App extends React.Component {
  componentWillMount() {
    const payload = {
      email: config.email,
      password: config.password
    };

    fetch(`${server.address}login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        config.token = data.token;
        fetch(`${server.address}me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": config.token
          }
        })
          .then(res => res.json())
          .then(data => {
            config._id = data._id;
          });
      });
  }

  render() {
    return <NavigationApp />;
  }
}
