import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Topic from './topic'
class Chapter extends Component {

    showsubject = (data, index) => (
        <Topic
            data={data}
            index={index}
            removeTopic={this.props.removeTopic}
            editTopic={this.props.editTopic}
            openModel1={this.props.openModel1}></Topic>
    )

    render() {
        const { openModel, removeChapter, editChapter, subjectData, load } = this.props
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Chapter no.</th>
                            <th>Chapters
                            <OverlayTrigger placement="top"
                                    overlay={<Tooltip> Add New Chapter</Tooltip>}>
                                    <Button variant="primary" size="sm" style={{ float: "right" }}
                                        onClick={openModel}><FontAwesomeIcon icon={faPlus} /></Button>
                                </OverlayTrigger>
                            </th>
                            <th>Topics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectData.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.chapterName}
                                    <OverlayTrigger placement="top"
                                        overlay={<Tooltip>Delete Chapter</Tooltip>}>
                                        <Button variant="danger" size="sm" style={{ float: "right" }}
                                            onClick={() => removeChapter(index)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top"
                                        overlay={<Tooltip>Edit Chapter Name</Tooltip>}>
                                        <Button variant="info" size="sm" style={{ float: "right" }}
                                            onClick={() => editChapter(index)}><FontAwesomeIcon icon={faEdit} /></Button>
                                    </OverlayTrigger>
                                </td>
                                <td>

                                    {load == true ? this.showsubject(data, index) : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default Chapter