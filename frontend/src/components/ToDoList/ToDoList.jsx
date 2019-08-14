import React from "react";
import InputBar from "../InputBar/InputBar"
import './ToDoList.css'
import * as api from '../utilis/api'
class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ToDoList: [],
        };
        this.addTask = this.addTask.bind(this);
        this.starItem = this.starItem.bind(this);
    }

    starItem(task) {
        api.starItem(task,
            taskstar => {
                console.log(taskstar["star"])
            },
            error => {
                console.log("opps")
            });






    }
    componentDidMount() {
        api.getActivities(
            Task => {
                let tasks = [];
                Task.all.forEach(function (task) {
                    console.log(task)
                    tasks.push(task)
                });
                this.setState({ ToDoList: tasks })
            },
            error => {
                console.log(error);
            });

    }



    addTask(newtask) {
        api.createTask({ "task": newtask, "star": false, "user_id": 47 },
            Task => {
                console.log(Task);
                this.setState({
                    ToDoList: [...this.state.ToDoList, Task]
                });

            },
            error => {
                console.log(error);
            })

    }

    deletetask(index, task) {
        api.DeleteTask(task,
            newActivity => {

                let templist = [...this.state.ToDoList]
                templist.splice(index, 1)
                console.log(templist);
                this.setState({
                    ToDoList: templist
                });
            },
            error => {
                console.log(error);
            })
    }







    render() {
        return (
            <div className="wraper">
                <InputBar addTask={this.addTask} />
                <ul className="ToDOList">
                    {this.state.ToDoList.map((item, index) => (
                        <li className="ToDoTask" key={index}><span><i onClick={() => { this.starItem(item) }} class="far fa-star taskstar"></i>{item["task"]}</span> <span><i onClick={() => { this.deletetask(index, item) }} class="fas fa-trash-alt deleteBtn"></i></span></li>
                    ))}
                </ul>
            </div >
        );
    }
}

export default ToDoList;