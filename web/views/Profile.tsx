import useLogin from '../store/UseLogin';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../core/components/layout/AppHeader';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import CardUniversity from '../components/CardUniversity';


const Profile = () => {
	const [login, _] = useLogin();
	const navigate = useNavigate();
	if (!login) {
		navigate('/');
	}

	const [universities, setUniversity] = useState([]);
	const [selected, setSelect] = useState(null);

	useEffect(() => {
		if (login && login.id) {
			UserService.getUser(login.id).then(({ data }) => {
				if (data.universities.length) {
					setUniversity(data.universities);
					setSelect(data.universities[0]);
				}
			});
		}
	}, [login]);

	return (
		<>
			<AppHeader />
			<div className='flex justify-content-center p-8'>
				<Panel className='w-full justify-content-center'>
					<div className='grid'>
						<div className='col'>
							<h2 className='text-primary'>My favorites</h2>
							{universities.map((item, key) => (
								<CardUniversity item={item} key={key} starPress={() => {
									setSelect(item);
								}} />
							))}
						</div>
						<div className='col'>
							<h2 className='text-primary'>Selected university</h2>
							{selected ? (
								<Card title={selected.name}>
									<p className='m-0'>{selected.name}</p>
									<p>Website: <a href={selected.web_pages[0]} target='_blank'
																 className='text-primary'>{selected.domains}</a></p>
									<p>Location: {selected.name}</p>
									<p>Country’s capital: {selected.country}</p>
									<p>Currency: {selected.alpha_two_code}</p>
								</Card>
							) : <></>}
						</div>
					</div>
				</Panel>
			</div>
		</>
	);
};

export default Profile;