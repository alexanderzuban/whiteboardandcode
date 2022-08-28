import styled from "styled-components";

const ButtonDiv = styled.div`
  width: ${props => props.theme.navigationPanel.size}px;
  height: ${props => props.theme.navigationPanel.size}px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid silver;

  :hover {
    background-color: ${props => props.theme.navigationPanel.focusedBackgroundColor};
  }
`;

export default ButtonDiv
