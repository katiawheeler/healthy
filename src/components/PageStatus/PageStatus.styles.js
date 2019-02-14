import styled from '@emotion/styled';

export const Banner = styled('div')`
    padding: 15px;
    border-radius: 4px;
    font-size: 20px;
    font-family: 'Helvetica', 'Arial', sans-serif;
    background: ${props => props.hasError ? '#ef5350' : '#2ecc71'};
    color: white;
    margin-bottom: 60px;
`