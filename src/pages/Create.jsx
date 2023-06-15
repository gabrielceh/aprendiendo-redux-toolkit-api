import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createSubAsync } from '../app/features/subs/subs.slice'

const Create = () => {
	const [form, setForm] = useState({
		nick: '',
		months: '',
		description: '',
	})
	const dispatch = useDispatch()

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(
			createSubAsync({
				...form,
				id: Date.now(),
				months: +form.months,
				photoUrl: `https://i.pravatar.cc/150?u=${form.nick}`,
			})
		)
	}
	const handleChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type='text' name='nick' value={form.nick} onChange={handleChange} placeholder='nick' />
			<input
				type='number'
				name='months'
				value={form.months}
				onChange={handleChange}
				placeholder='Months'
			/>
			<input
				type='text'
				name='description'
				value={form.description}
				onChange={handleChange}
				placeholder='description'
			/>
			<button>create</button>
		</form>
	)
}

export default Create
