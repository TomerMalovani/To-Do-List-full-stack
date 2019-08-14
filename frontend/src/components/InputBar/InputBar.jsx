import React from "react";
import './InputBar.css'



class InputBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
        this.changetext = this.changetext.bind(this);
        this.inputInsert = this.inputInsert.bind(this);
    }
    changetext(e) {
        this.setState({
            input: e.target.value
        });
    }

    inputInsert() {
        if (this.state.input !== "") {
            this.props.addTask(this.state.input);
            this.setState({
                input: ""
            });
        }


    }

    render() {
        return (
            <div class="InputDiv">
                <input maxlength="30" className="InputBar" type="text" placeholder="what i gotta do.." value={this.state.input} onChange={this.changetext}></input>
                <button className="InputBtn" onClick={this.inputInsert}>Lets do It</button>
            </div>

        );
    }
}

export default InputBar;