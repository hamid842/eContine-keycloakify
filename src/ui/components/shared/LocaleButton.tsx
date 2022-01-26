import {useState, useRef, memo} from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import {makeStyles} from "@mui/styles";
// import i18next from "i18next";

import {useLng} from "i18n/useLng";

const useStyles = makeStyles({
    localeBtn: {
        textTransform: 'capitalize',
        width: '120'
    }
})

const options = [{label: 'English', value: 'en'}, {label: 'French', value: 'fr'}, {label: 'Dutch', value: 'de'}];

const LocaleButton = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState('En')
    const anchorRef = useRef<HTMLElement>(null);
    const {lng, setLng} = useLng()

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    // const handleClickLanguage = (event:any)=>{
    //     setLng(event.target.value);
    //     handleClose(event);
    // }

    const onMenuItemClickFactory = useCallbackFactory(
        (lng: any) => {
            setLng(lng);
            setLanguage(lng)
            setOpen(false)
        },
    );


    return (
        <>
            <Button variant={'outlined'} size={'small'} startIcon={<GTranslateIcon/>} endIcon={<KeyboardArrowDownIcon/>}
                    onClick={handleToggle} className={classes.localeBtn}>{language}</Button>
            {/*<ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">*/}
            {/*    <Button onClick={handleClick}>{options[selectedIndex]}</Button>*/}
            {/*    <Button*/}
            {/*        size="small"*/}
            {/*        aria-controls={open ? 'split-button-menu' : undefined}*/}
            {/*        aria-expanded={open ? 'true' : undefined}*/}
            {/*        aria-label="select merge strategy"*/}
            {/*        aria-haspopup="menu"*/}
            {/*        onClick={handleToggle}*/}
            {/*    >*/}
            {/*        <ArrowDropDownIcon />*/}
            {/*    </Button>*/}
            {/*</ButtonGroup>*/}
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={index}
                                            value={option.value}
                                            selected={lng === option.value}
                                            onClick={onMenuItemClickFactory(
                                                option.value,
                                            )}
                                            lang={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default memo(LocaleButton);
