/* eslint-disable react-native/no-inline-styles */

import {faker} from '@faker-js/faker/locale/pt_BR';
import _ from 'lodash';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import {
  Button,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  A11yModule,
  A11yOrder,
  A11yProvider,
  useCombinedRef,
  useFocusOrder,
} from 'react-native-a11y';

export default () => {
  return (
    <A11yProvider>
      <App />
    </A11yProvider>
  );
};

type Message = {
  content: string;
  position: 'left' | 'right';
};

function Message({
  content,
  position,
  lastMessageRef,
}: Message & {
  lastMessageRef: RefObject<View>;
}) {
  return (
    <View
      ref={lastMessageRef}
      accessible
      style={{padding: 10, flexDirection: 'row'}}>
      {position === 'right' && <View style={{width: '20%'}} />}
      <View
        style={{
          padding: 10,
          flex: 1,
          borderWidth: 1,
        }}>
        <Text style={{textAlign: position}}>{content}</Text>
      </View>
      {position === 'left' && <View style={{width: '20%'}} />}
    </View>
  );
}

function App() {
  const [messages, setMessages] = useState<Message[]>(
    Array.from({length: 10}).map(() => createRandomMessage()),
  );
  const [input, setInput] = useState('');
  const lastMessageRef = useRef<View>(null);

  const {a11yOrder, refs} = useFocusOrder(5);
  const [scrollViewRef, setScrollViewRef] = useCombinedRef<ScrollView>(refs[4]);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({animated: false});
    });
  }, [scrollViewRef]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <A11yOrder style={{flex: 1}} a11yOrder={a11yOrder}>
        <Text ref={refs[0]}>Você tem uma urgência</Text>
        <View style={{height: 20}} />
        <View ref={refs[1]} accessible>
          <Text>Leonardo Guarnieri de Bastiani</Text>
          <Text>Companheiro</Text>
        </View>
        <View style={{height: 20}} />
        <ScrollView ref={setScrollViewRef} style={{flex: 1}}>
          {messages.map((message, index) => (
            <Message
              lastMessageRef={lastMessageRef}
              key={index}
              content={message.content}
              position={message.position}
            />
          ))}
        </ScrollView>
        <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
          <TextInput
            ref={refs[2]}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              flex: 1,
            }}
            placeholder="Escreva sua mensagem..."
            value={input}
            onChangeText={setInput}
          />
          <Button
            title="💌"
            ref={refs[3]}
            onPress={() => {
              if (input) {
                setMessages(currentMessages => [
                  ...currentMessages,
                  {
                    content: input,
                    position: 'right',
                  },
                ]);
              } else {
                setMessages(currentMessages => [
                  ...currentMessages,
                  createRandomMessage(),
                ]);
              }
              setInput('');
              Keyboard.dismiss();
              requestAnimationFrame(() => {
                scrollViewRef.current?.scrollToEnd();
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    A11yModule.setA11yFocus(lastMessageRef);
                  });
                });
              });
            }}
          />
        </View>
        <View style={{height: 20}} />
      </A11yOrder>
    </SafeAreaView>
  );
}
function createRandomMessage(): Message {
  return {
    content: faker.hacker.phrase(),
    position: _.sample(['left', 'right'])!,
  };
}
