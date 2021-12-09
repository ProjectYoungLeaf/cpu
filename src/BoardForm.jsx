import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <NavLink
            to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
          >
            {this.props.createdAt.substring(0, 10)}
          </NavLink>
        </td>
        <td>
          <NavLink
            to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
          >
            {this.props.title}
          </NavLink>
        </td>
        <td>
          <NavLink
              to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
          >
            {this.props.username}
          </NavLink>
        </td>
      </tr>
    );
  }
}

class BoardForm extends Component {
  state = {
    boardList: [],
  };

  componentDidMount() {
    this.getBoardList();
  }

  getBoardList = () => {
    const send_param = {
      headers,
      _id: $.cookie("login_id")
    };
    axios
      .post("http://localhost:8080/board/getBoardList", send_param)
      .then(returnData => {
        let boardList;
        let userID;
        if (returnData.data.list.length > 0) {
          // console.log(returnData.data.list.length);
          const boards = returnData.data.list;
          const username = returnData.data.user;
          // console.log(user)

          boardList = boards.map(item => (
              <BoardRow
                key={Date.now() + Math.random() * 500}
                _id={item._id}
                username={username}
                createdAt={item.createdAt}
                title={item.title}
              ></BoardRow>
          ));

          this.setState({
            boardList: boardList,
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            boardList: boardList,
            userID : userID
          });
          // window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const divStyle = {
      margin: 50
    };

    return (
      <div>
        <div style={divStyle}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>날짜</th>
                <th>글 제목</th>
                <th>작성자</th>
              </tr>
            </thead>
            <tbody>{this.state.boardList}</tbody>
            <tbody>{this.state.userID}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default BoardForm;
