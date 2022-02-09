import {memo, ReactNode} from "react";
import {Paper, createTheme} from "@mui/material";
import {makeStyles} from "@mui/styles";

const theme = createTheme()

const useStyles = makeStyles({
    container: {
        backgroundColor: 'white',
        width: 400,
        // height: 500,
        borderRadius: '30px !important',
        opacity: 0.9,
        color: '#1d5149',
        margin: 'auto',
        padding: 15,
        marginTop: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: 350,
            // height: 450,
            marginTop: 40,
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            // height: 450,
            marginTop: 50,
        }
    }
})

interface Props {
    children: ReactNode
}

const FormBox = memo((props: Props) => {
    const {children} = props;
    const classes = useStyles()
    return (
        <Paper elevation={24} className={classes.container}>{children}</Paper>
    )
})

export default FormBox;
