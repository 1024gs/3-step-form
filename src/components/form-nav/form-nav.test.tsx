import React from '../../../vendors/react';
import {shallow} from 'enzyme';
import FormNav from './form-nav';

describe('FormNav', () => {
  it('renders', () => {
    const wrapper = shallow(<FormNav />);
    expect(wrapper).toMatchSnapshot();
  });
});
