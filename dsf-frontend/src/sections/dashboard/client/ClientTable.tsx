import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import ClientForm from './ClientForm';
import { UseQueryResult } from '@tanstack/react-query';
import DeleteClientDialog from './DeleteClientDialog';
import { DataTableSkeleton } from '../../../components/skeletons/DataTable';
import { IClient } from '../../../types';



const columnsTemplates=[
  {
    field:'fiscalId',
    header:'Id fiscal',
    minWidth:'16rem',
  },
  {
    field:'clientName',
    header:'Nom',
    minWidth:'12rem',
  },
  {
    field:'tel',
    header:'Téléphone',
    minWidth:'10rem',
  },
  {
    field:'email',
    header:'Email',
    minWidth:'10rem',
  },
  
]

interface Props{
	clientQuery:UseQueryResult<IClient[], unknown>
}

export default function ClientsTable({clientQuery}:Props) {
	let emptyClient: IClient = {
		fiscalId: '',
		email: '',
		clientName: '',
		tel: '',
	};
	// @ts-ignore
	const clients = clientQuery.data;
	const [clientDialog, setClientDialog] = useState<boolean>(false);
	const [deleteClientDialog, setDeleteClientDialog] = useState<boolean>(false);
	const [client, setClient] = useState<IClient>(emptyClient);
	const [clientToDelete, setClientToDelete] = useState<
		IClient | IClient[] | null
	>(null);
	const [selectedClients, setSelectedClients] = useState<IClient[]>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const dt = useRef<DataTable<IClient[]>>(null);

	const openNew = () => {
		setClient(emptyClient);
		setClientDialog(true);
	};

	const editClient = (client: IClient) => {
		setClient({ ...client });
		setClientDialog(true);
	};

	const confirmDeleteClient = (client: IClient) => {
		setClientToDelete(client);
		setDeleteClientDialog(true);
	};

	const confirmDeleteSelected = () => {
		setClientToDelete(selectedClients);
		setDeleteClientDialog(true);
	};

	const leftToolbarTemplate = () => {
		return (
			<div className="flex flex-wrap gap-2">
				<Button
					label="Nouveau"
					icon="pi pi-plus"
					severity="success"
					onClick={openNew}
				/>
				<Button
					label="Supprimer"
					icon="pi pi-trash"
					severity="danger"
					onClick={confirmDeleteSelected}
					disabled={!selectedClients || !selectedClients.length}
				/>
			</div>
		);
	};

	const actionBodyTemplate = (rowData: IClient) => {
		return (
			<React.Fragment>
				<Button
					icon="pi pi-pencil"
					rounded
					outlined
					className="mr-2"
					onClick={() => editClient(rowData)}
				/>
				<Button
					icon="pi pi-trash"
					rounded
					outlined
					severity="danger"
					onClick={() => confirmDeleteClient(rowData)}
				/>
			</React.Fragment>
		);
	};

	const header = (
		<div className="flex flex-wrap gap-2 items-center justify-between">
			<h4 className="m-0">Clients</h4>
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText
					type="search"
					placeholder="Rechercher..."
					onInput={(e) => {
						const target = e.target as HTMLInputElement;
						setGlobalFilter(target.value);
					}}
				/>
			</span>
		</div>
	);

	return (
		<div>
			{clientQuery.isLoading ? (
					<DataTableSkeleton columnsTemplates={columnsTemplates} />
			) : (
				<>
					<div className="card">
						<Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
						{/* @ts-ignore */}
						<DataTable
							ref={dt}
							value={clients}
							selection={selectedClients}
							onSelectionChange={(e) => {
								if (Array.isArray(e.value)) {
									setSelectedClients(e.value);
								}
							}}
							sortField="clientName" sortOrder={1}
							dataKey="_id"
							paginator
							rows={10}
							rowsPerPageOptions={[5, 10, 25]}
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
							currentPageReportTemplate="De {first} à {last} de {totalRecords} clients"
							globalFilter={globalFilter}
							header={header}
						>
							<Column selectionMode="multiple" exportable={false}></Column>
              {columnsTemplates.map(col=>(
                <Column
                key={col.field}
								field={col.field}
								header={col.header}
								sortable={col.field==='clientName'}
								style={{ minWidth: col.minWidth }}
							></Column>
              ))}
							<Column
								body={actionBodyTemplate}
								exportable={false}
								style={{ minWidth: '12rem' }}
							></Column>
						</DataTable>
					</div>

					<ClientForm
						client={client}
						isVisible={clientDialog}
						setIsVisible={setClientDialog}
					/>
					<DeleteClientDialog
						isVisible={deleteClientDialog}
						setIsVisible={setDeleteClientDialog}
						client={clientToDelete}
						setClient={setClientToDelete}
					/>
				</>
			)}
		</div>
	);
}