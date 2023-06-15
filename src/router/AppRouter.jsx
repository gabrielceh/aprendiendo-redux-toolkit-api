import { Link, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Create from '../pages/Create'
import Details from '../pages/Details'

const AppRouter = () => {
	return (
		<>
			<Link to='/'>Home</Link> | <Link to='/create'>Create</Link>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/create' element={<Create />}></Route>
				<Route path='/detail/:id' element={<Details />}></Route>
			</Routes>
		</>
	)
}

export default AppRouter
