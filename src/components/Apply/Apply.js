import React from 'react';
import AppBar from '../AppBar/Appbar'
import ApplyForm from './ApplyForm';
//import UploadFile from './UploadFile';
import { Card } from '@material-ui/core';
// import { fetchGetCharacterList, fetchPostUser } from 'api'

class Apply extends React.Component {

    state = {
        class_area:null,
    }
    myCallback = (dataFromChild) => {
        this.setState({ class_area: dataFromChild });
    }

    componentDidMount() {
        // fetchGetCharacterList({
        //     page: 3
        // }).then((response) => {
        //     this.setState({
        //         data: response.data.data
        //     })
        // })
        // fetchPostUser({
        //     name: '123',
        // })
    }

    render() {
        // const { data } = this.state
        return (
            <div style={{ backgroundColor: "#111B24", height: "1000px" }}>
                <AppBar callbackFromParent={this.myCallback}/>

                {/* <UploadFile /> */}
                
                <Card style={{backgroundColor:"#212832", 
                                border:'1px white solid',
                                borderRadius:'10px',
                                width:'60%',
                                minWidth:'850px',
                                margin:'50px auto',
                                }}>
                <ApplyForm />
                </Card>

                {/* {
                    data && data.map((el, index) => (
                        <div key={index}>{el.first_name}</div>
                    ))
                } */}
            </div>
        )
    }

}

export default Apply;