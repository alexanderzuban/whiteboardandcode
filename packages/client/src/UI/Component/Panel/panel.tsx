import styled from "styled-components";
import {StyledComponentProps} from "../../../Style/styled";


export interface PanelProps extends StyledComponentProps {
    readonly  border?: string;
    readonly  borderTop?: string;
    readonly  borderBottom?: string;
    readonly  borderLeft?: string;
    readonly  borderRight?: string;
    readonly  backgroundColor: string;

}

const Panel = styled.div<PanelProps>` 
  position: fixed;
  border: ${props => props.border ?? ""};
  border-top: ${props => props.borderTop ?? ""};
  border-bottom: ${props => props.borderBottom ?? ""};
  border-left: ${props => props.borderLeft ?? ""};
  border-right: ${props => props.borderRight ?? ""}; 
  margin: 0;
  padding: 0;
  background-color: ${props => props.backgroundColor};
`;


export default Panel;
