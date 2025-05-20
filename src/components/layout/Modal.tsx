type Props ={
    isOpen:boolean 
    onClose: React.MouseEventHandler<HTMLButtonElement> | undefined
    message:string
  }
  
  const Modal = ({ isOpen, onClose, message }:Props) => {  
    if (!isOpen) return null;  
  
    return (  
      <div className="fixed bottom-4 left-4 p-4 border bg-green-200 shadow-lg rounded-lg z-50">  
        <h2 className="text-sm font-semibold">{message}</h2>  
        <div className='flex place-content-end'>
          <button  
              onClick={onClose}  
              className="text-sm mt-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600" 
          >  
              خروج  
          </button>  
        </div>
      </div>  
    );  
  };  
  
  export default Modal;  