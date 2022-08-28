import React, {useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import {sliceActionsAppView} from "./app-view.store";
import {logger} from "../../Common/debug";

const AppViewListener: React.FC = () => {
    logger.render("AppViewListener");

    const dispatch = useDispatch();

    const notifyWindowResize = useMemo(() => (width: number, height: number) => {
        dispatch(sliceActionsAppView.resize({width, height}));
    }, [dispatch]);


    useEffect(() => {
        function handleResize() {
            notifyWindowResize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [notifyWindowResize]);


    return (<></>);
}

export default AppViewListener;
