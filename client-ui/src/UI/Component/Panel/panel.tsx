import styled from "styled-components";
import {StyledComponentProps} from "../../../Style/styled";


export interface PanelProps extends StyledComponentProps {
    readonly  height: number;
    readonly  width: number;
    readonly  border?: string;
    readonly  borderTop?: string;
    readonly  borderBottom?: string;
    readonly  borderLeft?: string;
    readonly  borderRight?: string;
    readonly  backgroundColor: string;
    readonly  top: number;
    readonly  left: number;
}

const Panel = styled.div<PanelProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: fixed;
  border: ${props => props.border ?? ""};
  border-top: ${props => props.borderTop ?? ""};
  border-bottom: ${props => props.borderBottom ?? ""};
  border-left: ${props => props.borderLeft ?? ""};
  border-right: ${props => props.borderRight ?? ""};
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  margin: 0;
  padding: 0;
  background-color: ${props => props.backgroundColor};
`;


export default Panel;
