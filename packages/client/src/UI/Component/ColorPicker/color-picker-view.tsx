import React from "react";
import {logger} from "../../../Common/debug";
import {Col, Row, Typography} from "antd";
import {Nullable} from "../../../Common/generics";
import {partition} from "../../../Common/arrays";
import ColorCellView from "./color-cell-view";


interface ColorPickerViewProps {
    selected?: Nullable<string>,
    palette: string[],
    title: string,
    noColor?: boolean,
    cols?: Nullable<number>,
    onColorSelected?: Nullable<(color: string) => void>
}

const {Title} = Typography;

const ColorPickerView: React.FC<ColorPickerViewProps> = (props) => {
    logger.render("ColorPickerView")

    const palette = [...props.palette]

    if (props.selected && props.selected !== "" && !palette.find(c => props.selected)) {
        palette.push(props.selected)
    }

    if (props.noColor === true) {
        palette.push("")
    }

    const columns = props.cols ?? 5
    while (palette.length % columns !== 0) {
        palette.push("-")
    }

    return <>
        <Row>
            <Title style={{margin: 0}} level={5}>
                {props.title}
            </Title>
        </Row>
        {
            partition(palette, columns).map((row, index) => {
                return <Row justify="space-between" key={index}>
                    {
                        row.map((color, colorIndex) => {
                            return <Col key={color + "-" + colorIndex}>
                                <ColorCellView
                                    color={color}
                                    onColorSelected={props.onColorSelected}
                                    selected={props.selected}/>
                            </Col>
                        })
                    }

                </Row>

            })
        }

    </>
}

export default ColorPickerView;
