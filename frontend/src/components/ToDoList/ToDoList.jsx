import React from "react";
import InputBar from "../InputBar/InputBar"
import './ToDoList.css'
import * as api from '../utilis/api'
class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ToDoList: [],
            changeInput: "",
            editable: "far fa-edit editTask"
        }
        this.addTask = this.addTask.bind(this);
        this.starItem = this.starItem.bind(this);
        this.keepStarLogic = this.keepStarLogic.bind(this);
        this.changetext = this.changetext.bind(this);
    }

    changetext(e) {
        this.setState({
            changeInput: e.target.value
        });

        e.target.value = this.state.changeInput
        console.log(e.target.value)
        // = this.state.changeInput
    }


    keepStarLogic(task) {
        var toggleClass = task["star"] ? "fas fa-star taskstaron" : "far fa-star taskstar";
        return toggleClass;
    }

    starItem(task) {


        api.starItem(task,
            taskstar => {
                let tasks = [];
                taskstar.all.forEach(function (task) {
                    tasks.push(task);
                });
                this.setState({ ToDoList: tasks })
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
                    console.log(task);
                    tasks.push(task);
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
            <div>
                <h2 class="logo">EasyTask</h2>
                <div className="wraper">
                    <InputBar addTask={this.addTask} />
                    <ul className="ToDOList">
                        {this.state.ToDoList.map((item, index) => (
                            <li className="ToDoTask" key={item["id"]}>
                                <span><i id={item["id"]} onClick={() => { this.starItem(item) }} class={this.keepStarLogic(item)}></i><span>
                                    <input onChange={this.changetext} value={item["task"]} type="text" class="InputBar hide">
                                    </input><span class="taskContent"  >{item["task"]}</span>
                                </span></span>
                                <span><i onClick={() => { this.deletetask(index, item) }} class="fas fa-trash-alt deleteBtn"></i></span></li>
                        ))}
                    </ul>
                </div >
            </div>
        );
    }
}

export default ToDoList;
