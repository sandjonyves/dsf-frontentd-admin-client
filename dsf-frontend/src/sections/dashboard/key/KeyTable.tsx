import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { UseQueryResult } from '@tanstack/react-query';
import { DataTableSkeleton } from '../../../components/skeletons/DataTable';
import KeyForm from './KeyForm';
import DeleteKeyDialog from './DeleteKeyDialog';
import { IKey, IClient } from '../../../types';



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
    field:'expirationDate',
    header:"Date d'expiration",
    minWidth:'10rem',
  },
  {
    field:'hasExpired',
    header:'Expirée',
    minWidth:'10rem',
  },
  
]

interface Props{
	clientQuery:UseQueryResult<IClient[], unknown>
	keyQuery:UseQueryResult<IKey[], unknown>
}


export default function KeysTable({clientQuery, keyQuery}:Props) {
	let emptyKey: Partial<IKey> = {
		numberOfdays: 30,
		clientId: '',
	};
	// @ts-ignore
	const keys = keyQuery.data;
	const clientsValues = clientQuery.data?.map(cl=>({label:cl.clientName, value:cl._id}));
	const [keyDialog, setKeyDialog] = useState<boolean>(false);
	const [deleteKeyDialog, setDeleteKeyDialog] = useState<boolean>(false);
	const [key, setKey] = useState<Partial<IKey>>(emptyKey);
	const [keyToDelete, setKeyToDelete] = useState<
		Partial<IKey> | Partial<IKey>[] | null
	>(null);
	const [selectedKeys, setSelectedKeys] = useState<IKey[]>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const dt = useRef<DataTable<IKey[]>>(null);

	const openNew = () => {
		setKey(emptyKey);
		setKeyDialog(true);
	};


	const confirmDeleteKey = (client: IKey) => {
		setKeyToDelete(client);
		setDeleteKeyDialog(true);
	};

	const confirmDeleteSelected = () => {
		setKeyToDelete(selectedKeys);
		setDeleteKeyDialog(true);
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
					disabled={!selectedKeys || !selectedKeys.length}
				/>
			</div>
		);
	};

	const actionBodyTemplate = (rowData: IKey) => {
		return (
			<React.Fragment>
				<Button
					icon="pi pi-trash"
					rounded
					outlined
					severity="danger"
					onClick={() => confirmDeleteKey(rowData)}
				/>
			</React.Fragment>
		);
	};

	const statusBodyTemplate = (rowData: IKey) => {
			return <Tag value={rowData.hasExpired?'OUI':'NON'} severity={rowData.hasExpired?'danger':'success'}></Tag>;
	};

	const header = (
		<div className="flex flex-wrap gap-2 items-center justify-between">
			<h4 className="m-0">Clés d'activation</h4>
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
			{keyQuery.isLoading ? (
					<DataTableSkeleton columnsTemplates={columnsTemplates} />
			) : (
				<>
					<div className="card">
						<Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
						{/* @ts-ignore */}
						<DataTable
							ref={dt}
							value={keys}
							selection={selectedKeys}
							onSelectionChange={(e) => {
								if (Array.isArray(e.value)) {
									setSelectedKeys(e.value);
								}
							}}
							sortField="clientName" sortOrder={1}
							dataKey="_id"
							paginator
							rows={10}
							rowsPerPageOptions={[5, 10, 25]}
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
							currentPageReportTemplate="De {first} à {last} de {totalRecords} clés"
							globalFilter={globalFilter}
							header={header}
						>
							<Column selectionMode="multiple" exportable={false}></Column>
              {columnsTemplates.map(col=>(
                <Column
                key={col.field}
								field={col.field}
								header={col.header}
								style={{ minWidth: col.minWidth }}
								body={col.field ==='hasExpired' &&  statusBodyTemplate}
								sortable={col.field==='clientName'}
							></Column>
              ))}
							<Column
								body={actionBodyTemplate}
								exportable={false}
								style={{ minWidth: '12rem' }}
							></Column>
						</DataTable>
					</div>

					<KeyForm
						selectedKey={key}
						isVisible={keyDialog}
						setIsVisible={setKeyDialog}
						/* @ts-ignore */
						clientsValues={clientsValues}
					/>
					<DeleteKeyDialog
						isVisible={deleteKeyDialog}
						setIsVisible={setDeleteKeyDialog}
						selectedKey={keyToDelete}
						setSelectedKey={setKeyToDelete}
					/>
				</>
			)}
		</div>
	);
}