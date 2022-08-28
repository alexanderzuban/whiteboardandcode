import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faArrowPointer,
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
    faWindowClose
} from '@fortawesome/pro-light-svg-icons'

import {faCircle} from "@fortawesome/free-solid-svg-icons";

export function setupFontAwesome() {
    //solid
    library.add(faCircle)

    //light
    library.add(
        faShapes,
        faBars,
        faSquareQuestion,
        faWindowClose,
        faPenLine,
        faPalette,
        faFill,
        faFilePen,
        faFilePlus,
        faCirclePlus,
        faArrowPointer,
        faHand,
        faArrowsUpDownLeftRight,
        faMagnifyingGlass,
        faQuestion,
        faEraser,
        faChalkboardUser,
        faCode,
        faEllipsisV
    )
}



