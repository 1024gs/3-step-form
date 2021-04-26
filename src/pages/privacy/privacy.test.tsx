import React from '../../../vendors/react';
import {shallow} from 'enzyme';
import PrivacyPage from './privacy';

describe('PrivacyPage', () => {
  it('renders', () => {
    const wrapper = shallow(<PrivacyPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
