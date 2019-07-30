import styled from 'styled-components';

export const BannerWrapper = styled.div`
  color: white;
  background: #ef5350;
  width: 100%;
  position: relative;
`;

export const BannerContent = styled.div`
  padding: 20px;
  max-width: 1000px;
  font-size: 16px;
  font-family: 'Helvetica', 'Arial', sans-serif;
  margin: 0 auto;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 30%;
  right: 30px;
  background: transparent;
  color: white;
  border: none;
  box-shadow: none;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Helvetica', 'Arial', sans-serif;

  &:hover {
    background: #e53935;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;
