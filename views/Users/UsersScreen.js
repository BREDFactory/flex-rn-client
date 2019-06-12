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
// @flow
/* eslint-disable */
import React from "react";
import { Input, ListItem, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { append, filter, omit, reject, contains, __ } from "ramda";
import { NavigationScreenProp } from "react-navigation";
import I18n from "react-native-i18n";
import config from "../../config/api";
import server from "../../config/server";
import styles from "../Profile/ProfileScreenStyles";

import { goTo } from "../../utils/utils";

import ListPlaces from "@components/Users/ListPlaces";

import profileDefaultPic from "../../assets/profile.png";
// import { NavigationEvents } from "react-navigation";

type State = {
  users: Array<any> | string
};

type Props = {
  navigation: NavigationScreenProp<{}>
};

class UsersScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: I18n.t("users.title"),
    tabBarIcon: ({ tintColor }) => (
      <Icon name="users" size={20} color={tintColor} />
    )
  };

  _isMounted = false;

  constructor() {
    super();
    this.state = {
      users: [],
      search: "",
      userName: null,
      loading: false,
      friendLoading: false,
      arrayOfFriends: []
    };
  }

  getAsyncStorageUser = async () => {
    await AsyncStorage.getItem("USER", async (err, result) => {
      if (err || result === null) {
        goTo(this, "Login");
      } else {
        const { remoteDay, historical, arrayOfFriends, id } = JSON.parse(result);
        const userName = JSON.parse(result).name;
        const userFName = JSON.parse(result).fname;
        const place = JSON.parse(result).place;
        const photo = JSON.parse(result).photo;

        this.setState({
          userName: `${userName}/${userFName}`,
          remoteDay,
          name: JSON.parse(result).name,
          fname: JSON.parse(result).fname,
          photo,
          place,
          historical,
          id,
          arrayOfFriends: arrayOfFriends || []
        });
        this.fetchFriends();
      }
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const { navigation } = this.props;

    await this.getAsyncStorageUser();

    this._isMounted = true;
    this.getUsers();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  addFriend = item => {
    const { users, id, arrayOfFriends, friendLoading } = this.state;
    if (!friendLoading) {
      const newListOfUSers = users.filter(e => e.id !== item.id);
      this.setState({
        users: users.map(x => x.id === item.id ? Object.assign(x, { isFriend: true }) : x),
        arrayOfFriends: append(item, arrayOfFriends),
        friendLoading: true
      });
      const payload = {
        id_user: id,
        id: item.id,
        name: item.name,
        fname: item.fname,
        id_place: item.id_place,
        photo: item.photo
      };

      return fetch(`${server.address}add_friend`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${config.token}`
        }
      })
        .then(res => res.json()) // transform data to json
        .then(friend => {
          // this.setState({
          //   arrayOfFriends: append(item, friend.user.friend)
          // });
          AsyncStorage.setItem("USER", JSON.stringify(this.state));
          this.setState({ friendLoading: false });
        });
    }
  };

  fetchFriends = async () => {
    const { id } = this.state;
    return fetch(`${server.address}users/${id}/friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${config.token}`
      }
    })
      .then(res => res.json())
      .then(arrayOfFriends => {
        this.setState({ arrayOfFriends })
        const { users } = this.state;
        this.refreshFriends(arrayOfFriends, users)
        AsyncStorage.setItem("USER", JSON.stringify(this.state));
      });
  };

  refreshFriends = (arrayOfFriends, users) => {
    // Here we check if users are in the friend list
    const mappedUsers = users.map(
      word => Object.assign(word, { isFriend: !!arrayOfFriends.find(e => e.id === word.id) })
    );
    this.setState({
      users: mappedUsers
    });
  }

  getUsers = () => {
    this.setState({ loading: true });
    fetch(`${server.address}users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "authorization": `Bearer ${config.token}`
      }
    })
      .then(res => res.json()) // transform data to json
      .then(users => {
        if (this._isMounted) {
          const { arrayOfFriends } = this.state;
          this.refreshFriends(arrayOfFriends, users)
        }
        this.setState({ loading: false });
      });
  };

  _handleSearch = search => {
    this.setState({ search });
    // if (search.length >= 3) this.getUsers();
  };

  sortUsers = (a, b) => {
    const comp = b.isFriend - a.isFriend

    if (comp)
      return comp
    return a.name.localeCompare(b.name)
  }

  _handleList = () => {
    const { users, search } = this.state;

    if (users === [])
      return users
    users.sort(this.sortUsers);
    if (search === "")
      return users
    return users.filter(e => e.name.includes(search) || e.fname.includes(search))
  };

  removeFriend = friendToBeRemoved => {
    const { id, arrayOfFriends, users, friendLoading } = this.state;
    const isNotRemovedUser = userFriend => userFriend.id !== friendToBeRemoved.id;
    this.setState({
      users: users.map(x => !isNotRemovedUser(x) ? Object.assign(x, { isFriend: false }) : x),
      arrayOfFriends: filter(isNotRemovedUser, arrayOfFriends)
    });
    if (!friendLoading) {
      this.setState({ friendLoading: true });
      const payload = {
        id_user: id,
        id: friendToBeRemoved.id
      };

      fetch(`${server.address}remove_friend`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${config.token}`
        }
      })
        .then(res => res.json()) // transform data to json
        .then(friendUser => {
          AsyncStorage.setItem(
            "USER",
            JSON.stringify(this.state)
          );
          this.setState({ friendLoading: false });
        });
    }
  };

  render() {
    const { users, loading, userName, arrayOfFriends } = this.state;

    return (
      <ScrollView style={styles.view}>
        {/* <NavigationEvents onWillFocus={payload => this.getAsyncStorageUser()} /> */}
        <View style={{ marginLeft: 40, marginRight: 40 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <Input
              onChangeText={search => this._handleSearch(search)}
              style={{
                backgroundColor: "white"
              }}
              containerStyle={{ marginTop: 20, marginBottom: 20, flex: 4, marginRight: 10 }}
              inputStyle={{ fontFamily: "Raleway", fontSize: 16, paddingBottom: 2, paddingLeft: 0 }}
              placeholder={I18n.t("users.search_user")}
            />
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => this.getUsers()}
              style={{
                elevation: 2,
                backgroundColor: "#fff",
                shadowOpacity: 0.4,
                shadowRadius: 2,
                shadowColor: "#3662A0",
                shadowOffset: { height: 1, width: 0 },
                borderRadius: 17.5,
                flex: 1,
                height: 35,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name="arrow-right" size={15} color="#2E89AD" />
            </TouchableOpacity>
          </View>
          {/* <FindPlacesCard users={() => this.getUsers()} /> */}
          {!loading ? (
            <View>
              {users !== [] && users.length > 0 ? (
                <ListPlaces
                  handleList={this._handleList()}
                  prop1={item =>
                    item && `${item.name}/${item.fname}` !== userName ? (
                      <TouchableOpacity
                        activeOpacity={0.1}
                        key={item.id}
                        onPress={() => item.isFriend ? this.removeFriend(item) : this.addFriend(item)}
                      >
                        {/* <Card containerStyle={{ borderRadius: 10 }}> */}
                        <ListItem
                          title={`${item.name} / ${item.fname}`}
                          subtitle={item.id_place}
                          containerStyle={{ margin: 0, padding: 5 }}
                          titleStyle={{ fontFamily: "Raleway" }}
                          rightIcon={{
                            name: item.isFriend ? "star" : "star-border",
                            color: "#2E89AD"
                          }}
                          leftAvatar={{
                            source: item.photo ? { uri: item.photo } : profileDefaultPic,
                            imageProps: {
                              resizeMode: "contain",
                              backgroundColor: "white"
                            },
                            rounded: false
                          }}
                          bottomDivider={true}
                        />
                        {/* </Card> */}
                      </TouchableOpacity>
                    ) : null
                  }
                />
              ) : null}
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "white",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator
                style={{ marginTop: 40 }}
                size="large"
                color="#2E89AD"
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default UsersScreen;
