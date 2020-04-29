import { render } from '@testing-library/react';
import React from 'react';
import PageStatus from  './';

describe('src/components/PageStatus', () => {
    describe('render', () => {
        describe('when all Apis are healthy', () => {
            it('should render a green banner with the success message', () => {
                const { getByTestId } = render(<PageStatus hasError={false} />);
                const banner = getByTestId('banner');
                expect(banner).toHaveTextContent('All services operational!')
                expect(banner.classList).not.toContain('error');
            })
        })

        describe('when there is an error', () => {
            it('should render a red banner with the error message', () => {
                const { getByTestId } = render(<PageStatus hasError={true} />);
                const banner = getByTestId('banner');
                expect(banner).toHaveTextContent('We are currently experiencing outages with our services. Stay tuned!')
                expect(banner.classList).toContain('error');
            })

        })
    })
})