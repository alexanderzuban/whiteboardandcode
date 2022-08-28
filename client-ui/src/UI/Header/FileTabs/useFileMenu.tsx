import {ContentDocument} from "../../Content/Store/content.store";
import {Menu} from "antd";
import React from "react";
import {logger} from "../../../Common/debug";

export enum FileActions {
    Save = "save",
    Rename = "rename",
    Close = "close",
    CloseOther = "closeOther",
    CloseLeft = "closeLeft",
    CloseRight = "closeRight",
    CloseSaved = "closeSaved",
    Reload = "reload",
    Export = "export"

}

export function useFileMenu(file?: ContentDocument) {
    logger.render("useFileMenu")

    const menuActionHandler = (item: { key: string }) => {

    }

    const menu = (
        <Menu
            onClick={menuActionHandler}
            items={[
                {
                    label: 'Save',
                    key: FileActions.Save,
                },
                {
                    label: 'Rename',
                    key: FileActions.Rename,
                },
                {
                    label: 'Reload',
                    key: FileActions.Reload,
                },
                {
                    label: 'Export',
                    key: FileActions.Export,
                },
                {
                    label: 'Close',
                    key: FileActions.Close,
                },
                {
                    label: 'Close All BUT This',
                    key: FileActions.CloseOther,
                },
                {
                    label: 'Close All to the Left',
                    key: FileActions.CloseLeft,
                },
                {
                    label: 'Close All to the Right',
                    key: FileActions.CloseRight,
                },
                {
                    label: 'Close All Unchanged',
                    key: FileActions.CloseSaved,
                }
            ]
            }
        />
    );

    return menu;
}
