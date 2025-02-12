import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import * as api from './name-api';
import { NameCollection } from './name-collection';

describe('NameCollection component specs', () => {
  it('should display a list with one item when it mounts the component and it resolves the async call', async () => {
    // Arrange
    const getStub = jest
      .spyOn(api, 'getNameCollection')
      .mockResolvedValue(['John Doe']);

    // Act
    render(<NameCollection />);

    const itemsBeforeWait = screen.queryAllByRole('listitem');
    expect(itemsBeforeWait).toHaveLength(0);

    const items = await screen.findAllByRole('listitem');

    // Assert
    expect(items).toHaveLength(1);
    expect(getStub).toHaveBeenCalled();
  });

  it('should remove initial list when it mounts the component and it resolves the async call', async () => {
    // Arrange
    const initialNameCollection = ['initial-user'];
    const getStub = jest
      .spyOn(api, 'getNameCollection')
      .mockResolvedValue(['John Doe']);

    // Act
    render(<NameCollection initialNameCollection={initialNameCollection} />);

    const initialItems = screen.getAllByRole('listitem');
    expect(initialItems).toHaveLength(1);
    expect(initialItems[0].textContent).toEqual('initial-user');

    await waitForElementToBeRemoved(screen.queryByText('initial-user'));
    
    // Assert
    expect(screen.queryByText('initial-user')).not.toBeInTheDocument();
  });
});
