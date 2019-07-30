import styled from 'styled-components';

export const Banner = styled('div')`
  padding: 15px;
  border-radius: 4px;
  font-size: 20px;
  font-family: 'Helvetica', 'Arial', sans-serif;
  background: #2ecc71;
  color: white;
  margin-bottom: 60px;

  &.error {
    background: #ef5350;
  }
`;
