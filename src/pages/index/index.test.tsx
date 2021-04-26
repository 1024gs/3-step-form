import React from '../../../vendors/react';
import {shallow} from 'enzyme';
import IndexPage from './index';

describe('IndexPage', () => {
  it('renders', () => {
    const wrapper = shallow(<IndexPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
