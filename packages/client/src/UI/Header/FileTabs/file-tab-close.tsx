import {ContentDocument, sliceActionsContent} from "../../Content/Store/content.store";
import React from "react";
import {logger} from "../../../Common/debug";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Popconfirm} from "antd";
import {useDispatch} from "react-redux";

interface FileTabCloseViewProps {
    file: ContentDocument
}


const FileTabCloseView: React.FC<FileTabCloseViewProps> = (props) => {
    logger.render("FileTabCloseView");
    const dispatch = useDispatch();


    const closeHandler = (event: React.MouseEvent<SVGSVGElement>) => {
        event.nativeEvent.preventDefault()
        if (!props.file.unsaved) {
            dispatch(sliceActionsContent.deleteFile(props.file.uid))
        }
    }
    const confirmHandler = () => {
        dispatch(sliceActionsContent.deleteFile(props.file.uid))
    }

    const icon = <FontAwesomeIcon
        fontSize={14} icon={["fal", "window-close"]}
        onClick={closeHandler}/>

    if (props.file.unsaved) {
        return <Popconfirm
            placement="bottom"
            title={"Are you sure close this file?"}
            onConfirm={confirmHandler}
            okText="Yes"
            cancelText="No">
            {icon}
        </Popconfirm>
    }


    return <>{icon}</>
}

export default FileTabCloseView;
