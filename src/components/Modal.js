import { HiX } from "react-icons/hi";

const Modal = ({children,closeModal}) => {
    return(
        <article className=" fixed inset-0 flex items-center justify-center">
            <div className="absolute top-[25%] bg-white rounded-lg border-[1px] shadow-2xl" >
                <button onClick={() => closeModal(false)}><HiX className="w-8 h-8 mt-3 ml-3"/></button>
                
                {children}
            </div>
    </article>
    );
}

export default Modal;