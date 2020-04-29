import { render, cleanup } from '@testing-library/react';
import React from 'react';
import StatusRow, { StatusRowProps } from './index';

afterEach(cleanup);

describe('src/components/StatusRow', () => {
    it('should render the API name in the Ifo component', () => {
        const props: StatusRowProps = {
            name: 'Api',
            hasError: false,
        }

        const { getByTestId } = render(<StatusRow {...props} />);
        const info = getByTestId('row').firstElementChild;
        expect(info!.textContent).toBe('Api');
    });

    describe('when there is no error', () => {
        const props: StatusRowProps = {
            name: 'Api',
            hasError: false,
        }

        it('should have an empty classname on indicator', () => {
            const { getByTestId } = render(<StatusRow {...props} />);
            const indicator = getByTestId('row').children[1].firstElementChild;
            expect(indicator!.classList).not.toContain('error');
            expect(indicator!.classList).toContain('ok');
        });
    });

    describe('when there is an error', () => {
        const props: StatusRowProps = {
            name: 'Api',
            hasError: true,
        }

        it('should have an error classname on indicator', () => {
            const { getByTestId } = render(<StatusRow {...props} />);
            const indicator = getByTestId('row').children[1].firstElementChild;
            expect(indicator!.classList).not.toContain('ok');
            expect(indicator!.classList).toContain('error');
        });
    });
});