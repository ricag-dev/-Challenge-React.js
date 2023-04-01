import AppHeader from '../core/components/layout/AppHeader';
import useLogin from '../store/UseLogin';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import UniversityService from '../services/UniversityService';
import UserService from '../services/UserService';
import { Toast } from 'primereact/toast';

const Search = () => {
	const toast = useRef(null)
	const [login, _] = useLogin();
	const navigate = useNavigate();
	if (!login) {
		navigate('/');
	}

	const [value, setValue] = useState('');
	const [selected, setSelected] = useState([]);
	const [items, setItems] = useState([]);

	const search = (event) => {
		UniversityService.find(event.query).then(({ data }) => {
			setItems(data);
		});
	};

	const itemTemplate = (item) => {
		return (
			<div className='grid gap-2 align-items-center'>
				<div>{item.name}</div>
				<div><i><b>{item.country}</b></i></div>
			</div>
		);
	};

	const addUniversity = (item)=>{
		UserService.addUniversity(item, login.id).then((data)=>{
			toast.current.show({ severity: 'success', summary: 'University added', detail: `University applied: ${item.name}`, life: 3000 })
		})
	}

	return (
		<>
			<Toast position='top-center' ref={toast} />
			<AppHeader />
			<div className='flex justify-content-center p-8'>
				<Panel className='w-full md:w-8 justify-content-center'>
					<div className='grid'>
						<div className='col-10'>
							<AutoComplete className='w-full' value={value} suggestions={items} completeMethod={search}
														onChange={(e) => {
															setValue(e.value);
															if(typeof e.value =='object'){
																setValue('');
																console.log(e)
																setSelected([e.value]);
															}
														}} itemTemplate={itemTemplate} />
						</div>
						<div className='col-2'>
							<Button icon='pi pi-search' className='w-full' />
						</div>
					</div>
					<div className='my-5'>
						{ selected.map((item)=> (
							<Card header={(
								<div className="grid p-4 pb-0 align-items-center">
									<div className="p-card-title col mb-0">{item.country}</div>
									<div className="col text-right">
										<Button icon="pi pi-star" rounded text aria-label="star" severity="secondary" onClick={()=> addUniversity(item)} />
										<Button onClick={()=> {
											window.open(item.web_pages[0], '_blank');
										}} icon="pi pi-external-link" rounded text aria-label="Link" severity="secondary" />
									</div>
								</div>
							)}>
								<p className="m-0">{item.name}</p>
							</Card>
						)) }
					</div>
				</Panel>
			</div>
		</>
	);
};

export default Search;