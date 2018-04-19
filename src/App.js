import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { Button, Container, Form, Header, Icon, Input, Segment } from 'semantic-ui-react'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.sticker = React.createRef();

		this.state = {
			messageText: '',
			messageTime: '',
			canvas: []
		};

		this.messageChange = this.messageChange.bind(this);
		this.timeChange = this.timeChange.bind(this);
		this.saveSticker = this.saveSticker.bind(this);
	}

	messageChange(event) {
		this.setState({messageText: event.target.value});
	}

	timeChange(event) {
		this.setState({messageTime: event.target.value});
	}

	saveSticker() {
		const fileName = this.state.messageText.replace(/\W/g, '').substring(0, 16) || 'sticker';
		domtoimage.toBlob(this.sticker.current).then(blob => {
			FileSaver.saveAs(blob, fileName + '.png');
		});
	}

	render() {
		return (
			<div>
				<Segment inverted textAlign='center' style={{ marginBottom: '2em' }} vertical>
					<Header as='h1' content='Omairchats' inverted style={{
						fontSize: '3em',
						fontWeight: 'normal',
						marginBottom: '1em',
						marginTop: '1em',
					}}/>
				</Segment>
				<Container text>
					<Form>
						<Form.Group widths='equal'>
							<Form.Field control={Input} label='Message' placeholder='What should I say?' onChange={this.messageChange}/>
							<Form.Field control={Input} label='Time' placeholder='12:34 PM' onChange={this.timeChange}/>
							<Form.Field control={Button} label='&nbsp;' color='grey' icon labelPosition='left' onClick={this.saveSticker}>
								<Icon name='save' /> Save
							</Form.Field>
						</Form.Group>
					</Form>
					<section className='chat__body'>
						<div className='sticker' ref={this.sticker}>
							<div className='chathead' />
							<div className='messages'>
								<div className='message droplet'>
									<div className='message__text'>
										<div className='message__text__content'>{this.state.messageText || 'What should I say?'}
											<div className='message__time'>{this.state.messageTime || '12:34 PM'}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</Container>
			</div>
		);
	}
}

export default App;
