import * as React from 'react';
import { useState } from 'react';

const App: React.FC<AppProps> = () => {
	const [from, setFrom] = useState<string>('');
	const [subject, setSubject] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [sent, setSent] = useState<string>('');

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('req.body');
		console.log({ from, subject, text: message });

		let res = await fetch ('/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ from, subject, text: message })
		});
		if (res.ok) {
			let result = await res.json();
			console.log('Response is OK!');
			setSent(result.msg);
			setTimeout(() => setSent(''), 5000);
		} else {
			console.log('Response has an ERROR!');
		}
		setFrom('');
		setSubject('');
		setMessage('');
	}
	return (
		<main className="container">
			<section className="row justify-content-center my-2">
				<div className="col-md-6">
					<form className="form-group p-3 border rounded">
						<label>Your email address:</label>
						<input value={from} onChange={e => setFrom(e.target.value)} type="text" className="form-control my-1" />
						<label>Subject:</label>
						<input value={subject} onChange={e => setSubject(e.target.value)} type="text" className="form-control my-1" />
						<label>Message:</label>
						<textarea value={message} onChange={e => setMessage(e.target.value)} rows={7} className="form-control my-1" />
						<button onClick={handleClick} className="btn btn-primary btn-lg btn-block mx-auto mt-4 shadow" >Contact Me!</button>
					</form>
					{ sent.length === 0 ? null : <aside className="alert alert-success text-center">{sent}</aside> }
				</div>
			</section>
		</main>
	);
}

interface AppProps {}

export default App;
