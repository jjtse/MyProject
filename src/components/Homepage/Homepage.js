import React from 'react';

import AppBar from '../AppBar/Appbar'
import HomepageBar from './HomepageBar'
import Cards from '../Cards/Cards'
import Button from '../Button/Button'
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

//icon
import Applyicon from '@material-ui/icons/PersonAddOutlined';
import Rollcallicon from '@material-ui/icons/HowToRegOutlined';
import Classicon from '@material-ui/icons/FolderSharedOutlined';
import Teachericon from '@material-ui/icons/SchoolOutlined';
import Courseicon from '@material-ui/icons/LocalLibraryOutlined';
import Operationicon from '@material-ui/icons/SettingsOutlined';
import Makeupicon from '@material-ui/icons/DateRangeOutlined';
import Announceicon from '@material-ui/icons/AnnouncementOutlined';

const styles = theme =>({
  root:{
    width: "90%", 
    margin: "30px auto", 
    display: "flex", 
    flexDirection: "row" 
  },
  line:{
    borderColor: '#FFBF5F',
  },
  icon:{
    fontSize:'30pt',
    marginRight:theme.spacing.unit * 3,
  },
})

class Homepage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div >
        {/* 這是導覽 */}
        <AppBar />
        {/* 這是首頁導覽 */}
        <main style={{ marginTop: "20px" }}>
          <HomepageBar />
          {/* 這是背景排序 */}
          <div className={classes.root} >
            <Cards>
              課程辨識系統
              <hr className={classes.line} />
              {/* 跳頁連結 */}
              <NavLink activeClassName="active" to="/apply">
                <Button type="home"><Applyicon className={classes.icon} />報名</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/rollcall">
                <Button type="home"><Rollcallicon className={classes.icon} />點名</Button>
              </NavLink>
            </Cards>
            <Cards>
              課程資訊
              <hr className={classes.line} />
              <NavLink activeClassName="active" to="/class">
                <Button type="home"><Classicon className={classes.icon} />班級資料</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/teacher">
              <Button type="home"><Teachericon className={classes.icon} />老師管理</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/course">
              <Button type="home"><Courseicon className={classes.icon} />課程管理</Button>
              </NavLink>
            </Cards>
            <Cards>
              補習班管理
              <hr className={classes.line} />
              <NavLink activeClassName="active" to="/operation">
              <Button type="home"><Operationicon className={classes.icon} />營運狀態</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/makeupclass">
              <Button type="home"><Makeupicon className={classes.icon} />補課管理</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/announcment">
                <Button type="home"><Announceicon className={classes.icon} />公告</Button>
              </NavLink>
            </Cards>
          </div>
        </main>
      </div>
    )
  }

}

export default withStyles(styles)(Homepage);