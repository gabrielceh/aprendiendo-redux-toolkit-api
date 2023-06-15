import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubsAsync } from '../app/features/subs/subs.slice'
import { Link } from 'react-router-dom'

const Home = () => {
	const dispatch = useDispatch()
	const subsState = useSelector((state) => state.subs)

	useEffect(() => {
		if (subsState.subs.length <= 0) {
			console.log(subsState.subs.length <= 0)
			dispatch(fetchSubsAsync())
		}
	}, [])

	if (subsState.status === 'idle' || subsState.status === 'loading') return <h3>Loading...</h3>

	if (subsState.error) return <h3>Error: {subsState.error.message}</h3>

	return (
		<div>
			{subsState.subs.map((sub) => (
				<Link to={`/detail/${sub.id}`} key={sub.id}>
					<h3>{sub.nick}</h3>
				</Link>
			))}
		</div>
	)
}

export default Home
