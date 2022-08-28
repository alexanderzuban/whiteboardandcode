import React, {ReactElement, useMemo} from "react";
import {HotKeyCategory} from "./hotkeys.store";
import styled from "styled-components";
import HotKeyCategoryActionIconSelector from "./hot-key-category-action-icon-selector";
import HotKeyCategoryEditorSelector from "./hot-key-category-editor-selector";
import {logger} from "../../../Common/debug";


const PanelsWrapper = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: start;
`;

const PanelContent = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  justify-content: left;
  flex-direction: row;
  gap: 10px;
  align-items: start;
`;

interface HotKeyConfigurePanelProps {
    category: HotKeyCategory
}


const HotKeyConfigurePanel: React.FC<HotKeyConfigurePanelProps> = (props) => {
    logger.render("HotKeyConfigurePanel");


    const panel = useMemo(() => {

        type rowFunction = (actions: string[]) => { action: string, index: number }[];

        const topRowCells: rowFunction = (a) => {
            return a.slice(1, 6).map((a, i) => {
                return {action: a, index: i + 1}
            });
        }
        const bottomRowCells: rowFunction = (a) => {
            const result = a.slice(6).map((a, i) => {
                return {action: a, index: i + 6}
            });
            result.push({action: a[0], index: 0});
            return result;
        }

        const rowBuilder: (func: rowFunction) => ReactElement = (func: rowFunction) => {
            return <PanelContent>
                {
                    func(props.category.actions).map(a =>
                        <HotKeyCategoryActionIconSelector
                            action={a.action}
                            index={a.index}
                            category={props.category}
                        />
                    )
                }
            </PanelContent>
        }

        return <PanelsWrapper>
            {
                rowBuilder(topRowCells)
            }
            {
                rowBuilder(bottomRowCells)
            }
            <HotKeyCategoryEditorSelector category={props.category}/>

        </PanelsWrapper>
    }, [props.category]);

    return panel;
}
export default HotKeyConfigurePanel;
