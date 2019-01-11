// @flow
/* eslint-disable */
import React from "react";
import { FormInput, ListItem, Card } from "react-native-elements";
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
import LottieView from "lottie-react-native";

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
      arrayOfFriends: [],
      friendLoading: false,
      friend: []
    };
  }

  getAsyncStorageUser = () => {
    AsyncStorage.getItem("USER", (err, result) => {
      if (err || result === null) {
        goTo(this, "Login");
      } else {
        const { remoteDay, historical, friend, id } = JSON.parse(result);
        const userName = JSON.parse(result).name;
        const userFName = JSON.parse(result).fname;
        const place = JSON.parse(result).place;

        this.setState({
          userName: `${userName}/${userFName}`,
          remoteDay,
          name: JSON.parse(result).name,
          fname: JSON.parse(result).fname,
          place,
          historical,
          id,
          friend
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

      fetch(`${server.address}add_friend`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": config.token
        }
      })
        .then(res => res.json()) // transform data to json
        .then(friend => {
          this.setState({
            friend: append(item, friend.user.friend)
          });
          AsyncStorage.setItem("USER", JSON.stringify(this.state));
          this.setState({ friendLoading: false });
        });
    }
  };

  fetchFriends = () => {
    const { id } = this.state;
    fetch(`${server.address}users/${id}/friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": config.token
      }
    })
      .then(res => res.json())
      .then(arrayOfFriends => this.setState({ arrayOfFriends }));
  };

  getUsers = () => {
    const { friend } = this.state;
    this.setState({ loading: true });
    fetch(`${server.address}users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": config.token
      }
    })
      .then(res => res.json()) // transform data to json
      .then(users => {
        if (this._isMounted) {
          // Here we check if users are in the friend list
          const filteredUsers = users.filter(
            word => !friend.find(e => e.id === word.id)
          );
          // Here we want to refresh the friend list
          const filteredFriends = users.filter(word =>
            friend.find(e => e.id === word.id)
          );
          this.setState({
            users: friend.length > 0 ? filteredUsers : users,
            arrayOfFriends: filteredFriends
          });
        }
        this.setState({ loading: false });
      });
  };

  _handleSearch = search => {
    this.setState({ search });
    if (search.length >= 3) this.getUsers();
  };

  _handleList = () => {
    const { users, search, arrayOfFriends, friend } = this.state;

    const newT: string | Array<object> =
      users !== []
        ? users.filter(e => {
            let finalResult = true;
            // Object.keys(search).forEach(element => {
            //   if (
            //     search[element] !== e.name[element] &&
            //     search[element] !== e.fname[element]
            //   ) {
            //     finalResult = false;
            //   }
            // });
            for (let element in search) {
              if (
                search[element] !== e.name[element] &&
                search[element] !== e.fname[element]
              ) {
                finalResult = false;
              }
            }
            return finalResult;
          })
        : users;

    newT.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    users.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    return search === ""
      ? reject(contains(__, arrayOfFriends), users)
      : reject(contains(__, arrayOfFriends), newT);
  };

  removeFriend = friendToBeRemoved => {
    const { id, arrayOfFriends, friend, users, friendLoading } = this.state;
    const isRemovedUser = userFriend => userFriend.id !== friendToBeRemoved.id;
    this.setState({
      arrayOfFriends: filter(isRemovedUser, arrayOfFriends),
      friend: filter(isRemovedUser, friend)
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
          "x-access-token": config.token
        }
      })
        .then(res => res.json()) // transform data to json
        .then(friendUser => {
          AsyncStorage.setItem(
            "USER",
            JSON.stringify(omit(["arrayOfFriends"], this.state))
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
            <FormInput
              onChangeText={search => this._handleSearch(search)}
              style={{
                backgroundColor: "white"
              }}
              containerStyle={{ marginTop: 20, marginBottom: 20, width: 220 }}
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
                width: 35,
                height: 35,
                flex: 1,
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
              <View style={{ marginBottom: -22 }}>
                {arrayOfFriends.map(friend => {
                  if (friend)
                    return (
                      <TouchableOpacity
                        activeOpacity={0.1}
                        key={friend.id}
                        onPress={() => this.removeFriend(friend)}
                      >
                        <ListItem
                          key={friend.id}
                          title={`${friend.name} / ${friend.fname}`}
                          subtitle={friend.id_place}
                          fontFamily="Raleway"
                          rightIcon={{
                            name: "star",
                            color: "#2E89AD"
                          }}
                          avatar={
                            friend.photo !== ""
                              ? { uri: friend.photo }
                              : profileDefaultPic
                          }
                          avatarStyle={{
                            backgroundColor: "white",
                            resizeMode: "contain"
                          }}
                        />
                      </TouchableOpacity>
                    );
                  return null;
                })}
              </View>
              {users !== [] && users.length > 0 ? (
                <ListPlaces
                  handleList={this._handleList()}
                  prop1={item =>
                    item && `${item.name}/${item.fname}` !== userName ? (
                      <TouchableOpacity
                        activeOpacity={0.1}
                        key={item.id}
                        onPress={() => this.addFriend(item)}
                      >
                        {/* <Card containerStyle={{ borderRadius: 10 }}> */}
                        <ListItem
                          title={`${item.name} / ${item.fname}`}
                          containerStyle={{ margin: 0, padding: 0 }}
                          subtitle={item.id_place}
                          fontFamily="Raleway"
                          rightIcon={{
                            name: "star-border",
                            color: "#2E89AD"
                          }}
                          avatar={
                            item.photo !== ""
                              ? { uri: item.photo }
                              : profileDefaultPic
                          }
                          avatarStyle={{
                            backgroundColor: "white",
                            resizeMode: "contain"
                          }}
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
