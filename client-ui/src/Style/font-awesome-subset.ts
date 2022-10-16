import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faArrowPointer,
    faArrowRight,
    faArrowsUpDownLeftRight,
    faBars,
    faChalkboardUser,
    faCirclePlus,
    faCode,
    faEllipsisV,
    faEraser,
    faFilePen,
    faFilePlus,
    faFill,
    faHand,
    faMagnifyingGlass,
    faPalette,
    faPenLine,
    faQuestion,
    faShapes,
    faSquareQuestion,
    faText,
    faWindowClose
} from '@fortawesome/pro-light-svg-icons'

import {
    faCircle as fasCircle,
    faEraser as fasEraser,
    faHighlighter as fasHighlighter,
    faPen as fasPen
} from "@fortawesome/free-solid-svg-icons";

export function setupFontAwesome() {
    //solid
    library.add(fasCircle,
        fasHighlighter,
        fasPen,
        fasEraser);


    //light
    library.add(
        faArrowPointer,
        faArrowsUpDownLeftRight,
        faArrowRight,
        faBars,
        faChalkboardUser,
        faCirclePlus,
        faCode,
        faEllipsisV,
        faEraser,
        faFilePen,
        faFilePlus,
        faFill,
        faHand,
        faMagnifyingGlass,
        faPalette,
        faPenLine,
        faQuestion,
        faShapes,
        faSquareQuestion,
        faWindowClose,
        faText
    )
}



