jest.mock('react-native-a11y/lib/commonjs/modules', () => {
  const _currentFocusedTag = jest.fn();

  const A11yModule = {
    get _currentFocusedTag() {
      return _currentFocusedTag;
    },
    isKeyboardConnected: jest.fn(),
    keyboardStatusListener: jest.fn(),
    announceForAccessibility: jest.fn(),
    announceScreenChange: jest.fn(),
    setA11yFocus: jest.fn(),
    setPreferredKeyboardFocus: jest.fn(),
    setKeyboardFocus: jest.fn(),
    focusFirstInteractiveElement: jest.fn(),
    setA11yElementsOrder: jest.fn(),
  };

  return {
    __esModule: true,
    A11yModule,
    default: {A11yModule},
  };
});

import {A11yModule} from 'react-native-a11y';
import * as RN from 'react-native';
import '@testing-library/jest-native/extend-expect';

beforeEach(async () => {
  A11yModule.isKeyboardConnected.mockResolvedValue(false);
  const EventEmitter: typeof import('react-native/Libraries/vendor/emitter/EventEmitter').EventEmitter =
    require('react-native/Libraries/vendor/emitter/EventEmitter').default;
  const eventEmitter = new EventEmitter();
  (RN.AccessibilityInfo.addEventListener as jest.Mock).mockImplementation(
    (...args) => {
      // @ts-expect-error
      return eventEmitter.addListener(...args);
    },
  );
});
