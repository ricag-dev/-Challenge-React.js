import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const CardUniversity = ({ item,  starPress})=>{
	return (
		<Card className="my-3" header={(
			<div className="grid p-4 pb-0 align-items-center">
				<div className="p-card-title col mb-0">{item.country}</div>
				<div className="col text-right">
					<Button icon="pi pi-star" rounded text aria-label="star" severity="secondary" onClick={starPress} />
					<Button onClick={()=> {
						window.open(item.web_pages[0], '_blank');
					}} icon="pi pi-external-link" rounded text aria-label="Link" severity="secondary" />
				</div>
			</div>
		)}>
			<p className="m-0">{item.name}</p>
		</Card>
	)
}

export default CardUniversity;