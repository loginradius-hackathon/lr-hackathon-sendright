import React, { useState } from 'react'
import { Input, Grid, Form } from 'semantic-ui-react'
import { useStateContext } from '../contexts/ContextProvider';
const Settings = () => {

    const [templateText, setTemplateText] = useState({ senderName: "ABC Company", recepientName: "recepient", brandColor: "", industry: "", templateType: "" })

    const { currentMode } =
        useStateContext();
    const industryOptions = [
        "industry1",

        "industry2"

    ]
    const templateTypeOptions = [
        "templateType1",

        "templateType2"

    ]
    return (
        <div className='main-container'>
            <div className="main-header">
                <h2>Settings</h2>
                <p>Customize your content settings here</p>
            </div>
            <hr />
            <div className='main-container-inner'>
                
                    <Grid>
                        <Grid.Column width={4}>

                            <Form>

                                <Form.Field>
                                    <label>Sender Name</label>

                                    <input
                                        type='text'
                                        name='senderName'
                                        value={templateText.senderName}
                                        onChange={(e) => {
                                            setTemplateText({
                                                ...templateText,
                                                [e.target.name]: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label > Recipient Name</label>
                                    <input
                                        type='text'
                                        name='recepientName'
                                        value={templateText.recepientName}
                                        onChange={(e) => {
                                            setTemplateText({
                                                ...templateText,
                                                [e.target.name]: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label >Industry</label>
                                    <select
                                        name='industry'
                                        onChange={(e) => {

                                            setTemplateText({ ...templateText, [e.target.name]: e.target.value });
                                        }}
                                        value={templateText.industry}
                                    >
                                        {industryOptions.map((industry: any) => (
                                            <option key={industry} value={industry}>
                                                {industry}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Field>

                                <Form.Field>
                                    <label>Template Type</label>
                                    <select
                                        name='templateType'
                                        onChange={(e) => {

                                            setTemplateText({ ...templateText, [e.target.name]: e.target.value });
                                        }}
                                        value={templateText.templateType}
                                    >
                                        {templateTypeOptions.map((templateType: any) => (
                                            <option key={templateType} value={templateType}>
                                                {templateType}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Field>
                                <Form.Field>
                                    <label>Brand Color</label>
                                    <div className='custom-input'>
                                        <input
                                            type='color'
                                            name='brandColor'
                                            value={templateText.brandColor}
                                            onChange={(e) => {
                                                setTemplateText({
                                                    ...templateText,
                                                    [e.target.name]: e.target.value,

                                                });
                                            }}
                                        />
                                        <span>{templateText.brandColor}</span>
                                    </div>
                                </Form.Field>
                            </Form>

                        </Grid.Column>

                        <Grid.Column width={12}>

                            <div className="preview-container">
                                <div className="preview">

                                    <h4>
                                        {templateText.recepientName?`Hi ${templateText.recepientName}`:''}
                                    </h4>
                                    <p>
                                        Industry type is {`${templateText.industry}`} <br/> Template type is {`${templateText.templateType}`}
                                    </p>
                                    <h5>
                                        {templateText.senderName?
                                            "Best":"" }
                                    </h5>
                                    <strong>
                                    {templateText.senderName?
                                            `${templateText.senderName}`:"" }
                                    </strong>
                                </div>
                            </div>
                        </Grid.Column>

                    </Grid>

                
            </div>
        </div>
    )
}

export default Settings