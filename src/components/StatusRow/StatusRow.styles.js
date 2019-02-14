import styled from '@emotion/styled';

export const Row = styled('div')`
  color: #3d464d;
  padding: 10px 20px;
  display: flex;
  font-family: 'Helvetica', 'Arial', sans-serif;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-top: none;

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
    border-top: 1px solid #e0e0e0 !important;
  }
`;

export const Info = styled('div')`
  flex: 2;

  & h4 {
    margin: 5px;
  }
`;

export const Indicator = styled('span')`
  &.ok {
    color: #2ecc71;
  }

  &.error {
    color: #ef5350;
  }
`;

export const Status = styled('div')`
  text-align: right;
  flex: 1;
`;
