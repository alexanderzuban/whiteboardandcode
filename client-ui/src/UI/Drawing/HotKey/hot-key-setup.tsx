import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import {HotKeyCategory, sliceActionsAppHotKeys, SupportedHotKeyCategories} from "./hotkeys.store";
import {logger} from "../../../Common/debug";
import DefaultDrawProfiles from "../../../Drawing/Profile/draw-profiles";
import {DrawingProfile} from "../../../Drawing/Profile/profile";


const HotKeySetup: React.FC = (props) => {
    logger.render("HotKeySetup");

    const hotKeys = useSelector((state: AppState) => state.appHotKeys);

    const dispatch = useDispatch();


    useEffect(() => {
        function installProfile(category: HotKeyCategory, profile: DrawingProfile) {
            dispatch(sliceActionsAppHotKeys.registerHotKeyProfile({category: category.key, profile}))
        }

        function lookupCategory(key: SupportedHotKeyCategories) {
            return hotKeys.categories.find(c => c.key === key);
        }

        const categoryDraw = lookupCategory(SupportedHotKeyCategories.Draw);
        if (categoryDraw && (categoryDraw.profiles?.length ?? 0) === 0) {
            DefaultDrawProfiles.forEach(profile => installProfile(categoryDraw, profile));
        }


    }, [hotKeys, dispatch]);


    return <></>;
}
export default HotKeySetup;
