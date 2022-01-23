import {memo, ReactNode} from "react";
import {makeStyles} from "@mui/styles";

import studentsImage from 'assets/images/student.png'
import bg from 'assets/images/bg.png'

const useStyles = makeStyles({
    background: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        opacity: 0.5,
        position: 'relative'
    },
    layout: {
        top: 0,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        backgroundImage: `url(${bg})`,
        opacity: 0.6,
        position: 'absolute',
        overflow: 'hidden',
    },
    picContainer: {
        width: window.innerWidth,
        height: window.innerHeight + 100,
        position: 'absolute',
        left: 400,
        borderBottomLeftRadius: '100%',
    },
    pic: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
        position: 'absolute',
        borderBottomLeftRadius: '100%',
    },

})


interface Props {
    children: ReactNode
}

const LoginLayout = memo((props: Props) => {
        const {children} = props;
        const classes = useStyles();
        return (
            <>
                <div className={classes.background}/>
                <div className={classes.layout}>
                    <div className={classes.picContainer}>
                        <img src={studentsImage} className={classes.pic} alt={'Student Pic'}/>
                    </div>
                    <div>{children}</div>
                </div>
            </>
        )
    }
)

export default LoginLayout;
