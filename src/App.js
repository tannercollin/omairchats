import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import { Form, Input } from 'semantic-ui-react'
import './App.css';


class App extends Component {
	constructor(props) {
		super(props);

		this.sticker = React.createRef();
		this.appBody = React.createRef();

		this.state = {
			messageText: 'What should I say?',
			messageTime: '12:34 PM',
			canvas: []
		};
	}

	componentDidMount() {
		domtoimage.toPng(this.sticker.current).then(dataUrl => {
			let img = new Image();
			img.src = dataUrl;
			this.appBody.current.appendChild(img);
		});
	}

	render() {
		return (
			<div className='App' ref={this.appBody}>
				<section className='chat__body'>
					<div className='sticker' ref={this.sticker}>
						<div className='chathead' />
						<div className='messages'>

							<div className='message droplet'>
								<div className='message__text'>
									<div className='message__text__content'>{this.state.messageText}
										<div className='message__time'>{this.state.messageTime}</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</section>
			<Form>
				<Form.Group widths='equal'>
					<Form.Field control={Input} label='First name' placeholder='First name' />
					<Form.Field control={Input} label='Last name' placeholder='Last name' />
				</Form.Group>
			</Form>
			</div>
		);
	}
}

export default App;
