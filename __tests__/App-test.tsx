import React from 'react';
import App from '../App';

import {render, waitFor} from '@testing-library/react-native';
import {A11yModule} from 'react-native-a11y';

it('renders correctly', async () => {
  render(<App />);
  await waitFor(() =>
    expect(A11yModule.setA11yElementsOrder).toHaveBeenCalled(),
  );
  expect(
    A11yModule.setA11yElementsOrder.mock.calls[0][0].views[0].props
      .accessibilityLabel,
  ).toBe('Primeiro');
});
