import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import {logger} from "../../../Common/debug";
import {SupportedHotKeyCategories} from "../HotKey/hotkeys.store";
import {Col, Row} from "antd";
import ProfilePlaceholderView from "./profile-placeholder-view";
import ProfileEditorView from "../ProfileEditor/profile-editor-view";


interface CategoryEditorViewProps {
    category: SupportedHotKeyCategories
}

const CategoryEditorView: React.FC<CategoryEditorViewProps> = (props) => {
    logger.render("ProfileEditorView");
    const categories = useSelector((state: AppState) => state.appHotKeys.categories)
    const profile = useSelector((state: AppState) => state.appHotKeys.activeProfile)
    const category = categories.find(c => c.key === props.category)

    if (!category)
        return <></>
  
    return <>
        <Row justify="space-between">
            {
                category?.profiles.map((p, index) => {
                    return <Col key={p} span={4}>
                        <ProfilePlaceholderView profile={p}></ProfilePlaceholderView>
                    </Col>

                })
            }
        </Row>
        <Row justify="start">
            <Col span="24">
                <ProfileEditorView profile={profile}/>
            </Col>
        </Row>
    </>


}

export default CategoryEditorView;
