import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../Store/App.store";
import {HotKeyCategory, sliceActionsAppHotKeys, SupportedHotKeyCategories} from "./hotkeys.store";
import {SupportedOperations} from "../../../Drawing/Operation/operations";
import {logger} from "../../../Common/debug";


const HotKeySetup: React.FC = (props) => {
    logger.render("HotKeySetup");

    const hotKeys = useSelector((state: AppState) => state.appHotKeys);
    const profilesState = useSelector((state: AppState) => state.drawingSettings.newShapeSettings);
    const dispatch = useDispatch();


    useEffect(() => {
        function installAction(category: HotKeyCategory, action: string) {
            dispatch(sliceActionsAppHotKeys.registerHotKeyAction({category: category.key, action}))
        }

        function lookupCategory(key: SupportedHotKeyCategories) {
            return hotKeys.categories.find(c => c.key === key);
        }

        const operations = lookupCategory(SupportedHotKeyCategories.Operation);
        if (operations && operations.actions.length === 0) {
            const supportedOperations = [

                SupportedOperations.NewShape,
                SupportedOperations.Select,
                SupportedOperations.Pan,
                SupportedOperations.Scale,
                SupportedOperations.Translate,
                SupportedOperations.Erase,

            ];

            supportedOperations.forEach(a => installAction(operations, `${a}`));
        }

        const profiles = lookupCategory(SupportedHotKeyCategories.ShapeProfile);
        if (profiles && profiles.actions.length === 0) {

            profilesState.profiles.slice(0, 10)
                .forEach(p => installAction(profiles, `${p.key}`));
        }

        const lineWidth = lookupCategory(SupportedHotKeyCategories.LineWidth);
        if (lineWidth && lineWidth.actions.length === 0) {
            const thicknesses = ["10", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            thicknesses.forEach(a => installAction(lineWidth, a));
        }


        const lineColor = lookupCategory(SupportedHotKeyCategories.LineColor);
        if (lineColor && lineColor.actions.length === 0) {
            const palette = [
                "rgba(255, 255, 255, 1)",
                "rgba(0, 0, 0, 1)",
                "rgba(0, 76, 124, 1)",
                "rgba(48, 50, 98, 1)",
                "rgba(112, 44, 22, 1)",
                "rgba(159, 0, 0, 1)",
                "rgba(114, 212, 245, 1)",
                "rgba(0, 197, 0, 1)",
                "rgba(152, 149, 190, 1)",
                "rgba(255, 169, 0, 1)"];

            palette.forEach(a => installAction(lineColor, a));
        }

        const fillColor = lookupCategory(SupportedHotKeyCategories.FillColor);
        if (fillColor && fillColor.actions.length === 0) {
            const palette = [
                "rgba(255, 255, 255, 1)",
                "rgba(0, 0, 0, 0.5)",
                "rgba(0, 76, 124,0.5)",
                "rgba(48, 50, 98, 0.5)",
                "rgba(112, 44, 22,0.5)",
                "rgba(159, 0, 0, 0.5)",
                "rgba(114, 212, 245, 0.5)",
                "rgba(0, 197, 0, 0.5)",
                "rgba(152, 149, 190, 0.5)",
                "rgba(255, 169, 0, 0.5)"];

            palette.forEach(a => installAction(fillColor, a));
        }


    }, [hotKeys, dispatch, profilesState.profiles]);


    return <></>;
}
export default HotKeySetup;
