import React, {useState} from 'react';
import {Button, Pressable, SafeAreaView, Text, View} from 'react-native';
import {A11yOrder, A11yProvider, useFocusOrder} from 'react-native-a11y';
import Modal from 'react-native-modal';

export default () => {
  return (
    <A11yProvider>
      <App />
    </A11yProvider>
  );
};
function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {a11yOrder, refs} = useFocusOrder(3);
  return (
    <SafeAreaView>
      <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor: 'white'}}>
          <Text>Paragrafo um</Text>
          <Text>Segundo parágrafo</Text>
          <Button title="Esconder" onPress={toggleModal} />
        </View>
      </Modal>
      <View>
        <A11yOrder a11yOrder={a11yOrder}>
          <Pressable
            onPress={toggleModal}
            style={{backgroundColor: 'red', height: 100, width: 100}}
            accessibilityLabel="Segundo"
            ref={refs[1]}
          />
          <View style={{height: 100}} />
          <View
            style={{backgroundColor: 'blue', height: 100, width: 100}}
            accessibilityLabel="Primeiro"
            accessibilityLanguage="en"
            ref={refs[0]}
          />
          <View style={{height: 100}} />
          <View
            style={{backgroundColor: 'green', height: 100, width: 100}}
            accessibilityLabel="Terceiro"
            ref={refs[2]}
          />
        </A11yOrder>
        <View style={{height: 100}} />
        <Text>Some text</Text>
        <Text accessibilityLanguage="pt">Meu nome é Leonardo</Text>
      </View>
    </SafeAreaView>
  );
}
