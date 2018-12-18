import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { Button, Container, Form, Header, Icon, Input, Segment } from 'semantic-ui-react'
import './App.css';
import Photomair from './photomair.jpg';
import Background from './background.jpg';

const colors = [
	{ text: 'Red', value: '#c03d33' },
	{ text: 'Green', value: '#4fad2d' },
	{ text: 'Yellow', value: '#d09306' },
	{ text: 'Blue', value: '#168acd' },
	{ text: 'Purple', value: '#8544d6' },
	{ text: 'Pink', value: '#cd4073' },
	{ text: 'Sea', value: '#2996ad' },
	{ text: 'Orange', value: '#ce671b' },
];

class App extends Component {
	constructor(props) {
		super(props);

		this.sticker = React.createRef();

		this.state = {
			name: '',
			color: '',
			image: null,
			background: null,
			messages: [{
				messageText: '',
				messageTime: '',
			}],
			messageText: '',
			messageTime: '',
			canvas: []
		};

		this.nameChange = this.nameChange.bind(this);
		this.colorChange = this.colorChange.bind(this);
		this.imageChange = this.imageChange.bind(this);
		this.messageChange = this.messageChange.bind(this);
		this.timeChange = this.timeChange.bind(this);
		this.addMessage = this.addMessage.bind(this);
		this.delMessage = this.delMessage.bind(this);
		this.saveScreenshot = this.saveScreenshot.bind(this);
		this.saveSticker = this.saveSticker.bind(this);
	}

	nameChange(event) {
		this.setState({name: event.target.value});
	}

	colorChange(event, {value}) {
		this.setState({color: value});
	}

	imageChange(event) {
		this.setState({
			image: URL.createObjectURL(event.target.files[0]),
		});
	}

	messageChange(event, id) {
		const value = event.target.value;
		this.setState(prevState => ({
			messages: prevState.messages.map((x, i) =>
				i === id ? {...x, messageText: value} : x
			)
		}));
	}

	timeChange(event, id) {
		const value = event.target.value;
		this.setState(prevState => ({
			messages: prevState.messages.map((x, i) =>
				i === id ? {...x, messageTime: value} : x
			)
		}));
	}

	addMessage() {
		this.setState(prevState => ({
			messages: prevState.messages.concat({
				messageText: '',
				messageTime: '',
			})
		}));
	}

	delMessage(event, id) {
		this.setState(prevState => {
			let oldMessages = prevState.messages;
			oldMessages.splice(id, 1);
			return {messages: oldMessages};
		});
	}

	saveScreenshot() {
		this.setState({background: Background}, () => {
			const fileName = this.state.messageText.replace(/\W/g, '').substring(0, 16) || 'screenshot';
			domtoimage.toBlob(this.sticker.current, {width: 512}).then(blob => {
				FileSaver.saveAs(blob, fileName + '.png');
				this.setState({background: null});
			});
		});
	}

	saveSticker() {
		const fileName = this.state.messageText.replace(/\W/g, '').substring(0, 16) || 'sticker';
		domtoimage.toBlob(this.sticker.current, {width: 512}).then(blob => {
			FileSaver.saveAs(blob, fileName + '.png');
		});
	}

	render() {
		const messages = this.state.messages;
		const nameColor = this.state.color || '#c03d33';

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
							<input hidden type='file' onChange={this.imageChange} className='inputfile' id='fileinput' />
							<Form.Field>
								<label>&nbsp;</label>
								<Button icon labelposition='left' as='label' color='green' htmlFor='fileinput'>
									<Icon name='upload' /> Upload image
								</Button>
							</Form.Field>
							<Form.Field control={Input} label='Name' placeholder='S N ❄️ W M A I R' onChange={this.nameChange}/>
							<Form.Select label='Colour' placeholder='Red' options={colors} onChange={this.colorChange}/>
						</Form.Group>
						{messages.map((x, id) =>
							<Form.Group widths='equal' key={id}>
								<Form.Field control={Input} label='Message' placeholder='What should I say?' value={messages[id].messageText} onChange={(e) => this.messageChange(e, id)}/>
								<Form.Field control={Input} label='Time' placeholder='12:34 PM' onChange={(e) => this.timeChange(e, id)}/>
								<Form.Field control={Button} disabled={id === 0} label='&nbsp;' color='red' icon onClick={(e) => this.delMessage(e, id)}>
									<Icon name='x' />
								</Form.Field>
							</Form.Group>
						)}
						<Form.Group>
							<Form.Field control={Button} label='&nbsp;' color='grey' icon labelPosition='left' onClick={this.addMessage}>
								<Icon name='plus' /> Add message
							</Form.Field>
							<Form.Field control={Button} label='&nbsp;' color='grey' icon labelPosition='left' onClick={this.saveScreenshot}>
								<Icon name='save' /> Save for screenshot
							</Form.Field>
							<Form.Field control={Button} label='&nbsp;' color='grey' icon labelPosition='left' onClick={this.saveSticker}>
								<Icon name='save' /> Save for sticker
							</Form.Field>
						</Form.Group>
					</Form>
					<section className='chat__body'>
						<div className='sticker' ref={this.sticker} style={{backgroundImage: `url(${this.state.background || 'none'})`}} >
							<div className='chathead' style={{backgroundImage: `url(${this.state.image || Photomair})`}} />
							<div className='messages'>
								{messages.map((x, id) =>
									<div className={id + 1 === messages.length ? 'message droplet' : 'message'}>
										<div className='message__text'>
											<div>
												{id ? null : <div className='message__name' style={{ color: nameColor }}>{this.state.name || 'S N ❄️ W M A I R'}</div>}
												{messages[id].messageText || 'What should I say?'}
												<div className='message__time'>{messages[id].messageTime || '12:34 PM'}</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</section>
					<Segment basic very padded>Source code: <a href="https://github.com/tannercollin/omairchats">https://github.com/tannercollin/omairchats</a></Segment>
				</Container>
			</div>
		);
	}
}

export default App;
