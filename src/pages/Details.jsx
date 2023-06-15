import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchSubDetailAsync, resetDetail, resetError } from '../app/features/subs/subs.slice'

const Details = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const subState = useSelector((state) => state.subs)

	useEffect(() => {
		dispatch(fetchSubDetailAsync(id))

		return () => {
			dispatch(resetDetail())
			dispatch(resetError())
		}
	}, [dispatch, id])

	if (subState.status === 'idle' || subState.status === 'loading') return <h3>Loading...</h3>

	if (subState.error) return <h3>Error: {subState.error}</h3>

	return (
		<div>
			<h1>{subState.subDetail.nick}</h1>
			<img src={subState.subDetail.photoUrl} alt={subState.subDetail.nick} />
		</div>
	)
}

export default Details
