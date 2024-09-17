import { useNavigate } from 'react-router-dom';
import NotFoundSVG from '../assets/notFound.svg'
import { Button } from 'primereact/button';

export default function NotFound() {
  const navigate = useNavigate()
	return (
		<div className="h-screen w-full flex flex-col justify-center items-center gap-6">
			<span className='text-gray-600 text-xl font-semibold'>Page Introuvable</span>
			<img
				src={NotFoundSVG}
				alt="notFound Logo"
				width={300}
				height={524}
			/>
      <Button  onClick={()=> navigate('/app')}>
        {"Page d'accueil"}
      </Button>
		</div>
	);
}
