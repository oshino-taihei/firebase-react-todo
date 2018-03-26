import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline'
import AppBar from 'material-ui/AppBar';
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { database } from './firebase-database'
import './ToDoApp.css';

class ToDoApp extends Component {
    constructor (props) {
        super(props)
        this.state = { 
            tasks: [],
            task: ''
        }
        this.loadDatabase()
    }

    inputTask = task => {
        this.setState({
            task: task
        })
    }

    addTask = task => {
        const tasksRef = database.ref('tasks');
        tasksRef.push({
            task: task
        }).catch(error => {
            console.error('Error writing new task to Firebase Database', error);
        })
    }

    loadDatabase = () => {
        const tasksRef = database.ref('tasks')
        tasksRef.off()
        tasksRef.on('child_added', data => {
            const task = data.val().task
            this.setState({
                tasks: [ ...this.state.tasks, task],
            })
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
                <Button color="secondary" onClick={ () => this.addTask(this.state.task) } >登録</Button>
                <List>
                    <CSSTransitionGroup
                        transitionName="todo"
                        transitionAppear={false}
                        transitionEnter={true}
                        transitionEnterTimeout={300}
                        transitionLeave={false}
                        transitionLeaveTimeout={300}
                    >
                        {listItems}
                    </CSSTransitionGroup>
                </List>
            </div>
        </div>
        );
    }
}

export default ToDoApp;
