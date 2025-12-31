import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faArrowPointer,
    faArrowRight,
    faArrowsUpDownLeftRight,
    faBars,
    faChalkboardUser,
    faCirclePlus,
    faCircleXmark,
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
} from "@fortawesome/pro-solid-svg-icons";

import {faCircle as fatCircle,} from "@fortawesome/pro-thin-svg-icons";

export function setupFontAwesome() {
    //solid
    library.add(fasCircle,
        fasHighlighter,
        fasPen,
        fasEraser);

    //thin
    library.add(fatCircle);


    //light
    library.add(
        faArrowPointer,
        faArrowsUpDownLeftRight,
        faArrowRight,
        faBars,
        faChalkboardUser,
        faCirclePlus,
        faCircleXmark,
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



