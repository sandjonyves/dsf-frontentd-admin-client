import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Props{
  columnsTemplates: {
    field:string,
    header:string,
		width?:string,
  }[]
}

export function DataTableSkeleton({columnsTemplates}:Props) {
	const items: number[] = [1,2,3,4,5];

	function bodyTemplate() {
		return <Skeleton></Skeleton>;
	}

	return (
    <div className="card">
				{/* @ts-ignore */}
			<DataTable value={items} className="p-datatable-striped">
     { columnsTemplates.map(col=>(
        <Column
        key={col.field} field={col.field} header={col.header}
					style={{ width: '25%' }}
					body={bodyTemplate}
				></Column>
      ))}
			</DataTable>
		</div>
  );
}
