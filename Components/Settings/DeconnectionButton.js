import { View } from 'react-native'
import { Button } from 'react-native-elements'
import React from 'react'
import styles from './styles/DeconnectionButtonStyle'

const DeconnectionButton = (props: { onPress: () => any }) => {
  const { onPress } = props;
  return <View
    style={styles.view}
  >
    <Button
      title="ME DÉCONNECTER"
      color="#2E89AD"
      icon={{
        name: 'power-off',
        type: 'font-awesome',
        size: 15,
        color: '#2E89AD'
      }}
      onPress={onPress}
      titleStyle={{
        fontWeight: '700',
        fontFamily: 'Raleway',
        color: '#2E89AD'
      }}
      buttonStyle={{
        backgroundColor: '#fff',
        width: 200,
        height: 45,
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#2E89AD'
      }}
      containerStyle={{ marginTop: 20 }}
    />
  </View>
}

export default DeconnectionButton
