import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Myclass from './ApplyFormClass';
import { Snackbar, SnackbarContent, Button } from '@material-ui/core';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import CameraIcon from '@material-ui/icons/CameraAltRounded';
import noTrain from './noTrain.jpg';
import { fetchPostStudent, fetchPostAccount } from '../../api';
import axios from 'axios';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const tableClass = base('ClassDay');

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


function createData(id, class_name) {
    return { id, class_name };
}

const IP = "http://localhost:8080";

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '40%',
    },
    container: {
        color: 'white',
    },
    photo: {
        width: '200px',
        height: '200px',
        marginLeft: '38%',
        marginTop: theme.spacing.unit * 10,
    },
    input: {
        outline: 'none',
        opacity: 0,
        width: '47%',
    },
    train: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        display: 'flex',
        border: '1px #FFBF5F solid',
        borderRadius: '30px',
        color: '#FFBF5F',
        margin: 'auto',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    textFieldLeft: {
        marginLeft: '14%',
        marginTop: theme.spacing.unit * 2,
        color: 'white',
        width: '260px',
    },
    textFieldRight: {
        marginLeft: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 2,
        color: 'white',
        width: '260px',
    },
    textFieldFull: {
        marginLeft: '14%',
        marginTop: theme.spacing.unit * 2,
        color: 'white',
        width: '570px',
    },
    form: {
        width: '800px',
        margin: 'auto',
    },
    snack: {
        backgroundColor: '#FFBF5F',
        color: '#111B24',
    }
});

class OutlinedTextFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            class_id: [],
            stu_img: noTrain,
            student_name: '',
            student_id: '',
            student_grade: '',
            student_phone: '',
            student_birth: '1998-07-13',
            student_school: '',
            student_email: '',
            student_parent: '',
            student_parent_phone: '',
            student_address: '',
            error1: false,
            error2: false,
            errorMessage1: '',
            errorMessage2: '',
            imgUrl: noTrain,
            open: false,
            openSnack: false,
            classDaydata: [],
            sendMessage: '尚未訓練！',
            send: true,
        };
    }

    //for compare classDay id with class_id
    componentDidMount() {
        //classDay table
        tableClass.select({
            view: "Grid view",
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            const record_id = this.state.records.map((record, index) => record.id.id);

            var temp = [];
            for (var index = 0; index < class_id.length; index++) {
                temp.push(createData(record_id[index], class_id[index]));
            }
            this.setState({ classDaydata: temp });
            fetchNextPage();
        }
        );
    }

    //https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
    myCallback = (dataFromChild) => {
        //this.setState({ class_id: dataFromChild }); 
        console.log(dataFromChild)
        var temp = [];
        for (var i = 0; i < dataFromChild.length; i++) {
            for (var index = 0; index < this.state.classDaydata.length; index++) {
                if (dataFromChild[i] == this.state.classDaydata[index].class_name) {
                    temp.push(this.state.classDaydata[index].id);
                    this.setState({ class_id: temp });
                }
            }
        }
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
        //console.log(this.state);
    };
    // _downloadTxtFile = () => {
    //     var element = document.createElement("a");
    //     var inputValue = "C:\\Face\\eGroupAI_FaceEngine_v3.1.0\\face\\JJ.jpg	"+document.getElementById('myInput').value+"[No]0"
    //     var file = new Blob([inputValue], {type: 'text/plain'});
    //     element.href = URL.createObjectURL(file);
    //     element.download = "list.txt";
    //     element.click();
    //   }


    handleSubmit = (e) => {
        e.preventDefault()
        let data = { fields: { student_name: {}, class_id_link: {}, student_id: {}, student_grade: {}, student_phone: {}, student_birth: {}, student_school: {}, student_email: {}, student_parent: {}, student_parent_phone: {}, student_address: {}, student_img: {} } };

        let accountData = { fields: { account_id: {}, account_passwd: {}, account_role: {} } };
        data.fields.student_name = this.state.student_name;
        // data.fields.class_id_link = ["rec8zHmPXU3k3uGhx",
        // "recbeKNQoG8h5jIwJ"];
        //data.fields.class_id_link = [this.state.class_id,];
        data.fields.class_id_link = this.state.class_id;
        data.fields.student_id = this.state.student_id;
        data.fields.student_grade = this.state.student_grade;
        data.fields.student_phone = this.state.student_phone;
        data.fields.student_birth = this.state.student_birth;
        data.fields.student_school = this.state.student_school;
        data.fields.student_email = this.state.student_email;
        data.fields.student_parent = this.state.student_parent;
        data.fields.student_parent_phone = this.state.student_parent_phone;
        data.fields.student_address = this.state.student_address;
        data.fields.student_img = [{ "url": this.state.imgUrl }];

        //account data
        accountData.fields.account_id = this.state.student_email;
        accountData.fields.account_passwd = '123';
        accountData.fields.account_role = 'student';

        if (this.state.student_name !== '' && this.state.student_id !== '') {
            fetchPostStudent(data);
            fetchPostAccount(accountData);
            // let memberData = { fields: { class_id: {}, student_id: {} } };
            // var count = this.state.class_id.length;
            // for (var index = 0; index < count; index++) {
            //     console.log(this.state.class_id[index]);
            //     memberData.fields.student_id = this.state.student_id;
            //     memberData.fields.class_id = this.state.class_id[index];
            // }
            // fetchPostClassMember(memberData);
        }
        else {
            if (this.state.student_name === '') {
                this.setState({ error1: true, errorMessage1: '*此欄位必填' })
            }
            else if (this.state.student_id === '') {
                this.setState({ error2: true, errorMessage2: '*此欄位必填' })
            }
        }
    };



    handleFocus = e => {
        this.setState({
            error1: false,
            error2: false,
            errorMessage1: '',
            errorMessage2: '',
        })
    }

    handleClick = () => {
        axios.create({
            baseURL: IP,
            headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).get("/retrieveface")
            .then((response) => {
                console.log("in response");
                console.log('open :', response.status, '\nopen camera', new Date());
            })
            .catch((error) =>
                console.error(error)
            );
    };

    handleUpload = (e) => {
        e.preventDefault();
        ////
        let file = e.target.files[0];
        const formimg = new FormData();
        const id = '4a951eb39b49f41'; // 填入 App 的 Client ID
        formimg.append('image', file); //required
        formimg.append('title', 'test'); //optional
        formimg.append('description', 'test'); //optional

        axios({
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            data: formimg,
            headers: { 'Content-Type': 'multipart/form-data', 'authorization': 'Client-ID ' + id },
            mimeType: 'multipart/form-data'
        }).then(res => {
            console.log(res);
            //console.log(res.data.data.link);
            this.setState({ imgUrl: res.data.data.link });
        }).catch(e => {
            console.log(e)
        })
        ////
        const formdata = new FormData();
        formdata.append('file', file);
        formdata.set('faceid', this.state.student_id);

        axios({
            method: 'post',
            url: 'http://localhost:8080/train',
            data: formdata,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                console.log("in upload")
                this.setState({ openSnack: true });
            })
            .catch((error) =>
                console.error(error)
            );

        axios.create({
            baseURL: IP,
            headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).get("/terminate")
            .then((response) => {
                console.log("in terminate");
            })
            .catch((error) =>
                console.error(error)
            );
        this.setState({ sendMessage: '送出！' })
        this.setState({send:false})
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseRefresh = () => {
        this.setState({ open: false });
        sleep(500).then(() => {
            window.location.reload();
        })
    };

    // componentDidUpdate() {
    //     console.log(this.state);
    // };


    render() {
        const { error1, error2, errorMessage1, errorMessage2 } = this.state
        const { classes } = this.props;

        return (
            <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                <div style={{ width: '100%' }}>
                    <img className={classes.photo} src={this.state.imgUrl} alt="location" />
                    <Button className={classes.button} onClick={this.handleClick}>
                        Open Camera
                    <CameraIcon className={classes.rightIcon} />
                    </Button>
                    <div className={classes.train}>
                        <input type="file" name="file" ref="file" id="contained-button-file" onChange={this.handleUpload} className={classes.input} />
                        <label htmlFor="contained-button-file">
                            <Button component="span" className={classes.button}>
                                Train
                        </Button>
                        </label>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.openSnack}
                        autoHideDuration={2000}
                    >
                        <SnackbarContent
                            className={classes.snack}
                            variant="warning"
                            message="訓練成功！"
                            autoHideDuration={2000}
                        />
                    </Snackbar>
                </div>
                <div className={classes.form}>
                    <div>
                        <TextField
                            id="outlined-helperText"
                            label="姓名"
                            value={this.state.name}
                            error={error1}
                            helperText={errorMessage1}
                            onClick={this.handleFocus}
                            onChange={this.handleChange('student_name')}
                            className={classes.textFieldLeft}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-helperText"
                            label="學號"
                            value={this.state.number}
                            error={error2}
                            helperText={errorMessage2}
                            onClick={this.handleFocus}
                            onChange={this.handleChange('student_id')}
                            className={classes.textFieldRight}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-name"
                            label="年級"
                            value={this.state.grade}
                            onChange={this.handleChange('student_grade')}
                            className={classes.textFieldLeft}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="date"
                            label="生日"
                            type="date"
                            value={this.state.student_birth}
                            onChange={this.handleChange('student_birth')}
                            className={classes.textFieldRight}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <Myclass callbackFromParent={this.myCallback} />
                    </div>
                    <div>
                        <TextField
                            id="outlined-name"
                            label="學校"
                            value={this.state.school}
                            onChange={this.handleChange('student_school')}
                            className={classes.textFieldLeft}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="手機"
                            value={this.state.phone}
                            onChange={this.handleChange('student_phone')}
                            className={classes.textFieldRight}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange('student_email')}
                            className={classes.textFieldFull}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-name"
                            label="住址"
                            value={this.state.address}
                            onChange={this.handleChange('student_address')}
                            className={classes.textFieldFull}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-name"
                            label="聯絡人"
                            value={this.state.parent}
                            onChange={this.handleChange('student_parent')}
                            className={classes.textFieldLeft}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="聯絡人手機"
                            value={this.state.parentPhone}
                            onChange={this.handleChange('student_parent_phone')}
                            className={classes.textFieldRight}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </div>
                <Button type="submit" disabled={this.state.send} className={classes.button} onClick={this.handleClickOpen} style={{ width: 300, margin: '20px auto', }}>
                {this.state.sendMessage}
                </Button>
                <Dialog className={classes.root}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle >已送出！</DialogTitle>
                    <DialogActions>
                        <Button style={{ margin: 'auto' }} onClick={this.handleCloseRefresh} color="primary">確定</Button>
                    </DialogActions>
                </Dialog>

                {/* <div>
                    <input id="myInput" />
                    <button onClick={this._downloadTxtFile}>Download txt</button>
                </div> */}
            </form>
        );
    }
}


OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(OutlinedTextFields);
