import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline'
import AppBar from 'material-ui/AppBar';
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import './ToDoApp.css';

class ToDoApp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tasks: ["掃除", "洗濯"],
            task: ''
        }
    }

    inputTask = task => {
        this.setState({
            task: task
        })
    }

    addTask = task => {
        this.setState({
            tasks: [ ...this.state.tasks, task],
        })
    }
    
    render() {
        const listItems = this.state.tasks.map((item, i) => {
            return (
                <ListItem key={i}>
                    <ListItemText primary={`・${item}`} />
                </ListItem>
            )
        })

        return (
        <div className="ToDoApp">
            <CssBaseline />
            <AppBar position="static">
                <Typography type="title" color="inherit">
                    ToDoアプリ
                </Typography>
            </AppBar>
            <div style={{ padding: '16px' }}>
                <Input onChange={ e => this.inputTask(e.target.value) } />
                <Button raised color="secondary" onClick={ () => this.addTask(this.state.task) } >登録</Button>
                <List>
                    <CSSTransitionGroup transitionName="todo" transitionEnterTimeout={300}>
                        {listItems}
                    </CSSTransitionGroup>
                </List>
            </div>
        </div>
        );
    }
}

export default ToDoApp;
