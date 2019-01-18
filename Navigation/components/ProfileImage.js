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
/* eslint-disable */

import React, { Component } from "react";
import { Image, AsyncStorage } from "react-native";

import { fetchPhoto } from "./reducer";
import { connect } from "react-redux";

class ProfileImage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchUserPhoto();
  }

  fetchUserPhoto = async () => {
    const userPhoto = await AsyncStorage.getItem("USER");

    this.props.fetchPhoto(JSON.parse(userPhoto).photo || "");
  };

  render() {
    const { photo } = this.props;

    return (
      <Image
        source={
          photo === ""
            ? require("../../assets/profile.png")
            : {
                uri: photo
              }
        }
        style={
          photo === ""
            ? {
                width: 30,
                height: 30,
                margin: 8,
                resizeMode: "contain"
              }
            : {
                width: 30,
                height: 30,
                borderRadius: 15,
                margin: 8,
                resizeMode: "cover"
              }
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    photo: state.photo
  };
};

const mapDispatchToProps = {
  fetchPhoto
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileImage);
