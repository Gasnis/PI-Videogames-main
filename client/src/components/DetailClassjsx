import React from "react";
import { connect } from "react-redux";
import { getVideoDetail } from "../redux/actions";



export class Detail extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            detail: []
        }
        console.log("Propos de Constructor: ", props)

        this.backHandler = (event) => {
            event.preventDefault();
            this.goBack()
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.getVideoDetail(id)
    }

    componentDidUpdate() {
        console.log(this.props.detail)
    }



    render() {
        return (
            <div>
                {
                    this.props.detail && <h1>{this.props.detail.name}</h1>
                }
            </div>
        )
    }

}

export const mapStateToProps = (state) => {
    return {
        detail: state.detail
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getVideoDetail: (id) => dispatch(getVideoDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)