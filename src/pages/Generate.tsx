import React from 'react'
import { Grid } from 'semantic-ui-react'
const Generate = () => {
  return (
    <div className='main-container'>
      <div className="main-header">
        <h2>Generate</h2>
        <p>Generate your email content and choose from our predefined templates</p>
      </div>
      <hr />
      <div className='main-container-inner'>
        <Grid>
          <Grid.Column width={5}>
            <div className='template-header'>
                <h3>Template 1</h3>
            </div>
            <div className="preview-container">
              <div className="preview">
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
          <div className='template-header'>
                <h3>Template 2</h3>
            </div>
            <div className="preview-container">
              <div className="preview">
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
          <div className='template-header'>
                <h3>Template 3</h3>
            </div>
            <div className="preview-container">
              <div className="preview">
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  )
}

export default Generate