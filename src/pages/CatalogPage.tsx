import { Catalog } from '../components/Catalog'

import { FC } from "react";
interface ICatalogPageProps {
}

export const CatalogPage: FC<ICatalogPageProps> = (props) => {
	return (
		<div>
			<Catalog />
		</div>
	);
}
