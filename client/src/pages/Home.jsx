import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home-container'>
            <h1>Welcome to Erin's Date Planner</h1>
            <p>Plan your perfect date with ease!</p>
            <Link to="/date" className='link'>Start Planning</Link>
        </div>
    );
};

export default Home;