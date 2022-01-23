import {memo, ReactNode} from "react";
import {Paper} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    container: {
        backgroundColor: 'white',
        width: 400,
        height: 500,
        borderRadius: '30px !important',
        opacity: 0.8,
        color: '#1d5149',
        margin: 'auto',
        padding: 15,
        marginTop: 60,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    }
})

interface Props {
    children: ReactNode
}

const LoginFormBox = memo((props: Props) => {
    const {children} = props;
    const classes = useStyles()
    return (
        <Paper elevation={24} className={classes.container}>{children}</Paper>
    )
})

export default LoginFormBox;
