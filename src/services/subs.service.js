import axios from 'axios'

export const getSubs = async () => {
	const { data } = await axios.get('http://localhost:3000/subs')
	return data
}

export const getSubById = async (id) => {
	const { data } = await axios.get(`http://localhost:3000/subs/${id}`)
	return data
}

export const createSub = async (sub) => {
	const { data } = await axios.post('http://localhost:3000/subs', sub)
	return data
}
