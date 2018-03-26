import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline'
import AppBar from 'material-ui/AppBar';
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import DeleteIcon from 'material-ui-icons/Delete'
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
        this.initTasksRef()
    }

    initTasksRef = () => {
        this.tasksRef = database.ref('tasks')
        this.tasksRef.off()
        this.tasksRef.on('child_added', data => {
            const task = data.val().task
            this.setState({
                tasks: [ ...this.state.tasks, task],
                task: ''
            })
        })
        this.tasksRef.on('child_removed', data => {
            const task = data.val().task
            const index = this.state.tasks.indexOf(task)
            if (index !== -1) {
                this.state.tasks.splice(index, 1)
                this.setState({ tasks: this.state.tasks })
            }
        })
    }

    inputTaskHandler = task => {
        this.setState({
            task: task
        })
    }

    addTask = task => {
        this.tasksRef.push({
            task: task
        }).catch(error => {
            console.error('Error writing new task to Firebase Database', error);
        })
    }

    deleteTask = task => {
        this.tasksRef.orderByChild('task').equalTo(task).once('child_added', data => {
            this.tasksRef.child(data.key).remove()
        })
    }

    render() {
        const listItems = this.state.tasks.map((task, i) => {
            return (
                <ListItem key={i}>
                    <ListItemText primary={task} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="削除">
                        <DeleteIcon onClick={e => this.deleteTask(task)} />
                        </IconButton>
                    </ListItemSecondaryAction>
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
                <Input value={ this.state.task } onChange={ e => this.inputTaskHandler(e.target.value) } />
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
