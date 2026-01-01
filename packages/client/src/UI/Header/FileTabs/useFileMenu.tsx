import {ContentDocument, sliceActionsContent} from "../../Content/Store/content.store";
import {Menu, Modal, Input} from "antd";
import React, {useState, useCallback} from "react";
import {logger} from "../../../Common/debug";
import {useDispatch} from "react-redux";

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
    const dispatch = useDispatch();
    const [renameModalVisible, setRenameModalVisible] = useState(false);
    const [newFileName, setNewFileName] = useState(file?.name || "");

    const handleRename = useCallback(() => {
        if (file && newFileName.trim()) {
            dispatch(sliceActionsContent.renameFile({uid: file.uid, name: newFileName.trim()}));
            setRenameModalVisible(false);
        }
    }, [dispatch, file, newFileName]);

    const menuActionHandler = useCallback((item: { key: string }) => {
        if (!file) return;

        switch (item.key) {
            case FileActions.Save:
                // Mark as saved (in a real app, this would also sync to backend)
                dispatch(sliceActionsContent.markFileSaved(file.uid));
                break;

            case FileActions.Rename:
                setNewFileName(file.name);
                setRenameModalVisible(true);
                break;

            case FileActions.Close:
                dispatch(sliceActionsContent.deleteFile(file.uid));
                break;

            case FileActions.CloseOther:
                dispatch(sliceActionsContent.closeOtherFiles(file.uid));
                break;

            case FileActions.CloseLeft:
                dispatch(sliceActionsContent.closeFilesToLeft(file.uid));
                break;

            case FileActions.CloseRight:
                dispatch(sliceActionsContent.closeFilesToRight(file.uid));
                break;

            case FileActions.CloseSaved:
                dispatch(sliceActionsContent.closeSavedFiles());
                break;

            case FileActions.Reload:
                // TODO: Implement reload from backend
                console.log("Reload not yet implemented - requires backend sync");
                break;

            case FileActions.Export:
                // TODO: Implement export functionality
                console.log("Export not yet implemented");
                break;

            default:
                console.warn(`Unknown file action: ${item.key}`);
        }
    }, [dispatch, file]);

    const menu = (
        <>
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
                        disabled: true, // Not yet implemented
                    },
                    {
                        label: 'Export',
                        key: FileActions.Export,
                        disabled: true, // Not yet implemented
                    },
                    {
                        type: 'divider',
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
                ]}
            />
            <Modal
                title="Rename File"
                open={renameModalVisible}
                onOk={handleRename}
                onCancel={() => setRenameModalVisible(false)}
                okText="Rename"
                cancelText="Cancel"
            >
                <Input
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onPressEnter={handleRename}
                    autoFocus
                    placeholder="Enter new file name"
                />
            </Modal>
        </>
    );

    return menu;
}
