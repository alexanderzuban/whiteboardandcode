import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import {HotKeyCategory, sliceActionsAppHotKeys, SupportedHotKeyCategories} from "./hotkeys.store";
import {logger} from "../../../Common/debug";
import DefaultDrawProfiles from "../../../Drawing/Profile/draw-profiles";
import {DrawingProfile} from "../../../Drawing/Profile/profile";
import DefaultShapeProfiles from "../../../Drawing/Profile/shape-profiles";
import {sliceActionsDrawingSettings} from "../../../Drawing/Store/drawing-settings.store";


const HotKeySetup: React.FC = (props) => {
    logger.render("HotKeySetup");

    const hotKeys = useSelector((state: AppState) => state.appHotKeys);

    const dispatch = useDispatch();


    useEffect(() => {
        function installProfile(category: HotKeyCategory, profile: DrawingProfile) {
            dispatch(sliceActionsAppHotKeys.registerHotKeyProfile({category: category.key, profile}))
            dispatch(sliceActionsDrawingSettings.registerDrawingProfile({profile}))
        }

        function lookupCategory(key: SupportedHotKeyCategories) {
            return hotKeys.categories.find(c => c.key === key);
        }

        const categoryDraw = lookupCategory(SupportedHotKeyCategories.Draw);
        if (categoryDraw && (categoryDraw.profiles?.length ?? 0) === 0) {
            DefaultDrawProfiles.forEach(profile => installProfile(categoryDraw, profile));
        }

        const categoryShape = lookupCategory(SupportedHotKeyCategories.Shape);
        if (categoryShape && (categoryShape.profiles?.length ?? 0) === 0) {
            DefaultShapeProfiles.forEach(profile => installProfile(categoryShape, profile));
        }


    }, [hotKeys, dispatch]);


    return <></>;
}
export default HotKeySetup;
