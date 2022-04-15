import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import React from 'react';
import Car from '../components/cars/Car';

describe('Tests for React components rendering', () => {
  const car = {
    id: 11,
    img_url: 'https://elitetraveler.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-05-at-10.48.37-768x486.png',
    model: 'Aston Martin Valkyrie',
    description: 'Valkyrie, its newest flagship, is a hybrid hypercar powered by an internal combustion engine. A bit of a head-scratcher, the battery pack services the vehicle’s electronics and integrates all relevant sub-systems while the V12 engine does the heavy lifting.',
    price: 0.0,
    created_at: '2022-04-13T18:34:43.595Z',
    updated_at: '2022-04-13T18:34:43.595Z',
  };

  it('Tests Car component', () => {
    const tree = render(
      <BrowserRouter>
        <Car car={car} />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
