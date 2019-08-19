import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
class Topic extends Component {
    render() {
        const { removeTopic, data, editTopic, index, openModel1 } = this.props
        return (
            <div>
                <OverlayTrigger placement="top"
                    overlay={<Tooltip>Add New Topic</Tooltip>}>
                    <Button variant="primary" size="sm" style={{ float: "right" }}
                        onClick={() => openModel1(index)}><FontAwesomeIcon icon={faPlus} /></Button>
                </OverlayTrigger>
                <Table bordered striped hover condensed>
                    <tbody>
                        {data.topic.map((topicData, i) => (
                            <tr key={i}>
                                <td>
                                    {topicData}
                                    <OverlayTrigger placement="top"
                                        overlay={<Tooltip>Delete Topic</Tooltip>}>
                                        <Button variant="danger" size="sm" style={{ float: "right" }}
                                            onClick={() => removeTopic(index, i)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top"
                                        overlay={<Tooltip>Edit Topic Name</Tooltip>}>
                                        <Button variant="info" size="sm" style={{ float: "right" }}
                                            onClick={() => editTopic(index, i)}><FontAwesomeIcon icon={faEdit} /></Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default Topic