import React from "react";
import {sliceActionsAppHotKeys} from "../hotkeys.store";

import {useDispatch} from "react-redux";
import {HotKeyEditorProps} from "./hot-key-editor-props";
import {Col, InputNumber, Row, Slider} from "antd";
import styled from "styled-components";
import {logger} from "../../../../Common/debug";

const FillingRow = styled(Row)`
  width: 100%;
  margin: 0;
  padding: 0;
`

const HotKeyLineWidthEditor: React.FC<HotKeyEditorProps> = (props) => {

    const dispatch = useDispatch();

    const currentValue = (props.category.selectedIndex !== undefined) ? props.category.actions[props.category.selectedIndex] : "1";
    const inputValue = Number(currentValue);

    logger.render("HotKeyLineWidthEditor", currentValue, props.category.selectedIndex, props.category.actions);

    function onWidthChanged(value: number) {
        if (value !== inputValue) {
            dispatch(sliceActionsAppHotKeys.registerHotKeyAction({
                category: props.category.key,
                action: `${value}`,
                index: props.category.selectedIndex
            }));
        }
    }

    return <FillingRow>
        <Col span={12}>
            <Slider
                min={1}
                max={20}
                onChange={onWidthChanged}
                value={typeof inputValue === 'number' ? inputValue : 0}
            />
        </Col>
        <Col span={2}>
            <InputNumber
                min={1}
                max={20}
                style={{margin: '0 16px'}}
                value={inputValue}
                onChange={onWidthChanged}
            />
        </Col>
    </FillingRow>
}
export default HotKeyLineWidthEditor;
