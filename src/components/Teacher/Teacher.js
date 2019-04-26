import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import TeacherTable from './TeacherTable';

const styles = theme => ({
});
class Teacher extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar />
                <TeacherTable />
            </div>
        )
    }

}

export default withStyles(styles)(Teacher);