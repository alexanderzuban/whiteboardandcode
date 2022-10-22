import React from "react";
import {logger} from "../../../Common/debug";
import {Col, Row} from "antd";
import {Nullable} from "../../../Common/generics";
import {
    ColorCitrus,
    ColorCrimson,
    ColorDarkTangerine,
    ColorDeepLilac,
    ColorEggplant,
    ColorKingfisherDaisy,
    ColorMayaBlue,
    ColorMediumVioletRed,
    ColorNavyBlue,
    ColorNero,
    ColorOrange,
    ColorPigmentGreen,
    ColorPumpkin,
    ColorSilver,
    ColorWhite,
    ColorWhiteSmoke
} from "../../../Common/css-colors";
import {partition} from "../../../Common/arrays";
import ColorCellView from "./color-cell-view";

export const DefaultPalette = [
    ColorWhite,
    ColorNero,
    ColorOrange,
    ColorDarkTangerine,
    ColorPumpkin,
    ColorCrimson,
    ColorEggplant,
    ColorMediumVioletRed,
    ColorKingfisherDaisy,
    ColorDeepLilac,
    ColorMayaBlue,
    ColorNavyBlue,
    ColorCitrus,
    ColorPigmentGreen,
    ColorWhiteSmoke,
    ColorSilver
];

export const DefaultTransparentPalette = [
    ColorWhite,
    ColorNero,
    ColorOrange,
    ColorDarkTangerine,
    ColorPumpkin,
    ColorCrimson,
    ColorEggplant,
    ColorMediumVioletRed,
    ColorKingfisherDaisy,
    ColorDeepLilac,
    ColorMayaBlue,
    ColorNavyBlue,
    ColorCitrus,
    ColorPigmentGreen,
    ColorWhiteSmoke,
    ColorSilver
];

interface ColorPickerViewProps {
    selected?: Nullable<string>,
    palette: string[],
    cols?: Nullable<number>,
    onColorSelected?: Nullable<(color: string) => void>
}

const ColorPickerView: React.FC<ColorPickerViewProps> = (props) => {
    logger.render("ColorPickerView")

    const palette = [...props.palette]

    if (props.selected && props.selected != "" && !palette.find(c => props.selected)) {
        palette.push(props.selected)
    }

    palette.push("")

    const columns = props.cols ?? 5
    while (palette.length % columns != 0) {
        palette.push("-")
    }

    return <>
        {
            partition(palette, columns).map((row, index) => {
                return <Row justify="space-between" key={index}>
                    {
                        row.map(color => {
                            return <Col key={color}>
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
