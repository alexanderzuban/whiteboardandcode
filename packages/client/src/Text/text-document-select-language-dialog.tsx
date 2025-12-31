import React, {ChangeEvent, useEffect, useState} from "react";
import {Input, List} from "antd";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../Store/App.store";
import {sliceActionsContent} from "../UI/Content/Store/content.store";
import {TextEditorLanguage} from "./Store/text-editor-settings.store";
import {ModalContentProps} from "../UI/Component/Modal/useModalDialog";
import {logger} from "../Common/debug";


interface TextDocumentSelectLanguageDialogViewProps extends ModalContentProps {
    uid: string
}

const Panel = styled.div`
  height: 200px;
  overflow: auto;
  margin: 0;
  padding: 0;
`
const InputPanel = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`

const ListItem = styled(List.Item)`
  :hover {
    background-color: ${props => props.theme.ui.selectionColor};
  }
`


const TextDocumentSelectLanguageDialogView: React.FC<TextDocumentSelectLanguageDialogViewProps> = (props) => {
    logger.render("TextDocumentSelectLanguageDialogView")

    const [visibleItems, setVisibleItems] = useState([] as TextEditorLanguage[]);
    const [filter, setFilter] = useState("");

    const languages = useSelector((state: AppState) => state.textSettings.languages)
    const dispatch = useDispatch()


    const onFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value)
    }

    const onLanguageSelected = (language: TextEditorLanguage) => {
        dispatch(sliceActionsContent.textDocumentSelectSyntax({
            uid: props.uid,
            language: language.uid
        }))
        props.hide()
    }

    useEffect(() => {
        setFilter("")
        setVisibleItems(languages.slice(0))
    }, [languages])

    useEffect(() => {
        if (filter.length > 0) {
            setVisibleItems(languages.filter(l => l.description.toLowerCase().indexOf(filter.toLowerCase()) >= 0))
        } else {
            setVisibleItems(languages.slice(0))
        }
    }, [languages, filter])


    return <>

        <InputPanel>
            <Input
                placeholder="Filter syntax..."
                onChange={onFilter}/>
        </InputPanel>

        <Panel>
            <List
                size="small"
                dataSource={visibleItems}
                renderItem={item => (
                    <ListItem onClick={() => onLanguageSelected(item)} key={item.uid}>{item.description}</ListItem>
                )}/>
        </Panel>

    </>
}

export default TextDocumentSelectLanguageDialogView;
