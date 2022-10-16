import styled from "styled-components";
import {StyledComponentProps} from "../../../Style/styled";
 
export interface ButtonProps extends StyledComponentProps {
    readonly  height?: number;
    readonly  width?: number;
    readonly  border?: string;
    readonly  backgroundColor?: string;
    readonly  focusedBackgroundColor?: string;

}


const ButtonDiv = styled.div<ButtonProps>`
  width: ${props => (props.width ?? props.theme.navigationPanel.size) - 2}px;
  height: ${props => (props.height ?? props.theme.navigationPanel.size) - 2}px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${props => props.border ?? "1px solid silver"};

  background: ${props => props.backgroundColor ?? props.theme.navigationPanel.backgroundColor};

  :hover {
    background-color: ${props => props.focusedBackgroundColor ?? props.theme.navigationPanel.focusedBackgroundColor};
  }
`;

export default ButtonDiv
