import './App.css';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import Chapter from './table/chapter'
import SweetAlert from 'react-bootstrap-sweetalert';
import { showData, addChapter, deleteChapter, editChapter, addTopic, editTopic, deleteTopic,fetchData } from './actions';
import { Button, Col, Modal, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
class App extends Component {

  state = {
    data: this.props.list.dataset,
    class: '',
    subject: '',
    subjectData: [],
    load: false,
    modal: false,
    modal1: false,
    newChapter: '',
    index: '',
    newTopic: '',
    disable: false,
    chapterIndex: '',
    topicIndex: '',
    tIndex: '',
    sAlert: false,
    sAlert1: false,
    sAlert2: false,
    sAlert3: false
  }

  componentDidMount = () => {
    this.props.showData()
  }

  selectStandard = e => {
    this.setState({ class: e.target.value })
  }

  selectSubject = e => {
    this.setState({ subject: e.target.value })
  }

  chapterName = event => {
    this.setState({ newChapter: event.target.value });
  }

  addOrUpdateChapter = event => {
    event.preventDefault();
    if (this.state.newChapter && this.state.chapterIndex === "") {
      let newData = { id: Math.random() * 10, chapterName: this.state.newChapter, topic: [] }
      this.props.addChapter(newData)
      this.setState({ modal: !this.state.modal, newChapter: '', sAlert: true });
    }

    if (this.state.newChapter && this.state.chapterIndex !== "") {
      this.props.editChapter(this.state.chapterIndex, this.state.newChapter)
      this.setState({ disable: false, modal: !this.state.modal, newChapter: '', chapterIndex: '', sAlert: true });
    }
  }

  editChapter = (i) => {
    this.setState({ modal: true, newChapter: this.state.subjectData[i].chapterName, disable: true, chapterIndex: i });
  }

  openModel = () => {
    this.setState({ modal: true });
  }

  openModel1 = (i) => {
    this.setState({ index: i, modal1: true });
  }

  topicName = event => {
    this.setState({ newTopic: event.target.value });
  }

  editTopic = (index, i) => {
    this.setState({ modal1: true, newTopic: this.state.subjectData[index].topic[i], disable: true, topicIndex: index, tIndex: i });
  }

  addOrUpdateTopic = event => {
    event.preventDefault();
    if (this.state.newTopic && this.state.tIndex === "") {
      this.props.addTopic(this.state.index, this.state.newTopic)
      this.setState({ modal1: !this.state.modal1, newTopic: '', sAlert2: true });
    }

    if (this.state.newTopic && this.state.tIndex !== "") {
      this.props.editTopic(this.state.topicIndex, this.state.tIndex, this.state.newTopic)
      this.setState({ disable: false, modal1: !this.state.modal1, newTopic: '', tIndex: '', sAlert2: true });
    }
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal, disable: false, newChapter: '' });
  }

  toggleModal1 = () => {
    this.setState({ modal1: !this.state.modal1, newTopic: '' });
  }

  getSyllabus = e => {
    e.preventDefault();
    var classDetails = this.state.data.find(cd => cd.class == this.state.class);
    var subjectContent = classDetails.content.find(cd => cd.sub == this.state.subject);
    this.setState({ subjectData: subjectContent.chapter, load: true })
    this.props.fetchData(this.state.class,this.state.subject)
  }

  removeChapter = (i) => {
    this.props.deleteChapter(i)
    this.setState({ sAlert1: true });
  }

  removeTopic = (index, i) => {
    this.props.deleteTopic(index, i)
    this.setState({ sAlert3: true });
  }

  addSweetAlert = () => (
    <SweetAlert success title="Success"
      onConfirm={() => { this.setState({ sAlert: false }) }}>
      Chapter Add Or Update Successfully
  </SweetAlert>
  )

  deleteSweetAlert = () => (
    <SweetAlert danger title="Remove"
      onConfirm={() => { this.setState({ sAlert1: false }) }}>
      Chapter Delete Successfully
  </SweetAlert>
  )

  addTopicAlert = () => (
    <SweetAlert success title="Success"
      onConfirm={() => { this.setState({ sAlert2: false }) }}>
      Topic Add Or Update Successfully
  </SweetAlert>
  )

  deleteTopicAlert = () => (
    <SweetAlert danger title="Remove"
      onConfirm={() => { this.setState({ sAlert3: false }) }}>
      Topic Delete Successfully
  </SweetAlert>
  )

  showsubject = () => (
    <Chapter subjectData={this.state.subjectData}
      openModel={this.openModel}
      openModel1={this.openModel1}
      removeChapter={this.removeChapter}
      editChapter={this.editChapter}
      removeTopic={this.removeTopic}
      editTopic={this.editTopic}
      load={this.state.load} >
    </Chapter>
  )

  render() {
    console.log(this.props.list.dataset);
    return (
      <div className="text">
        <h1>Manage Syllabus</h1>
        <Form onSubmit={this.getSyllabus}>
          <Form.Row>
            <Form.Group as={Col} controlId="classStanard">
              <Form.Label >Select standard</Form.Label>
              <Form.Control as="select" onChange={this.selectStandard}>
                <option value="" >Select</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="classSubject">
              <Form.Label>Select subject</Form.Label>
              <Form.Control as="select" onChange={this.selectSubject}>
                <option value="" >Select</option>
                <option value="physics">Phy</option>
                <option value="chemistry">Chem</option>
                <option value="maths">Math</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <br />
              <OverlayTrigger placement="top"
                overlay={
                  <Tooltip>check Syllabus</Tooltip>}>
                <Button type="submit">Go</Button>
              </OverlayTrigger>
            </Form.Group>
          </Form.Row>
        </Form>

        {this.state.load == true ? this.showsubject() : ''}
        <Modal show={this.state.modal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
              Add Chapter Name
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.addOrUpdateChapter}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Chapter Name</Form.Label>
                <Form.Control value={this.state.newChapter} type="text" placeholder="Enter Chapter Name" onChange={this.chapterName} />
              </Form.Group>
              {this.state.disable == false ? <Button variant="primary" type="submit">Add</Button> : <Button type="submit" variant="primary">Edit</Button>}
              <Button variant="danger" onClick={this.toggleModal}>Cancel</Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.modal1} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Topic Name
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.addOrUpdateTopic}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Topic Name</Form.Label>
                <Form.Control value={this.state.newTopic} type="text" placeholder="Enter Topic Name" onChange={this.topicName} />
              </Form.Group>
              {this.state.disable == false ? <Button variant="primary" type="submit">Add</Button> : <Button variant="primary" type="submit">Edit</Button>}
              <Button variant="danger" onClick={this.toggleModal1}>Cancel</Button>
            </Form>
          </Modal.Body>
        </Modal>
        {this.state.sAlert == true ? this.addSweetAlert() : ''}
        {this.state.sAlert1 == true ? this.deleteSweetAlert() : ''}
        {this.state.sAlert2 == true ? this.addTopicAlert() : ''}
        {this.state.sAlert3 == true ? this.deleteTopicAlert() : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.list
})
export default connect(mapStateToProps, { showData, addChapter, deleteChapter, editChapter, 
  addTopic, deleteTopic, editTopic,fetchData })(App);

