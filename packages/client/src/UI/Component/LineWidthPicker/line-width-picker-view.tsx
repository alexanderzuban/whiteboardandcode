import React from "react";
import {logger} from "../../../Common/debug";
import {Row, Slider, Typography} from "antd";
import {Nullable} from "../../../Common/generics";

const {Title} = Typography;


interface LineWidthPickerViewProps {
    selected?: Nullable<string>,
    sizes: string[],
    title: string,
    onWidthSelected?: Nullable<(width: string) => void>
}

const LineWidthPickerView: React.FC<LineWidthPickerViewProps> = (props) => {
    logger.render("LineWidthPickerView", props)

    const selectedIndex = props.sizes.indexOf(props.selected ?? "")
    const selected = selectedIndex < 0 ? 0 : selectedIndex;
    const valueChangeHandler = (size: any) => {
        if (props.onWidthSelected) {
            props.onWidthSelected(`${props.sizes[size]}`)
        }
    }
    const formatter = (value?: number) => `${props.sizes[value ?? 0]}`

    return <>
        <Row>
            <Title style={{margin: 0}} level={5}>
                {props.title}
            </Title>
        </Row>

        <Slider
            min={0}
            max={props.sizes.length - 1}
            tooltip={{formatter}}
            onChange={valueChangeHandler}
            value={selected}/>

    </>
}

export default LineWidthPickerView;
