import React, {ReactNode, useState} from "react";
import {Modal} from "antd";
import {logger} from "../../../Common/debug";

export interface ModalContentProps {
    hide: () => void
}

export interface ModalDialog {
    ui: ReactNode,
    show: () => void,
    hide: () => void
}

export function useModalDialog(
    title: string,
    content: (props: ModalContentProps) => ReactNode
): ModalDialog {
    logger.render("useModalDialog")

    const [isDisplayModal, setDisplayModal] = useState(false)


    const show = () => {
        setDisplayModal(true)
    }


    const hide = () => {
        setDisplayModal(false)
    }


    const ui =
        (isDisplayModal) ?
            <Modal
                title={title}
                open={true}
                onOk={hide}
                onCancel={hide}>
                {content({hide})}
            </Modal> :
            <></>;

    return {ui, show, hide}
}
