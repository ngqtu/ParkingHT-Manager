import { useEffect, useRef, useState } from 'react'
import "assets/css/dropdown.css"

export default function Dropdown({ children, trigger }) {
    const [show, setShow] = useState(false)
    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setShow(false)
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <div
            className='menu-container'
            onClick={() => setShow((curr) => !curr)}
            ref={menuRef}
        >
            <div>{trigger}</div>
            {show && <ul className='dropdown-menu'>{children}</ul>}
        </div>
    )
}

export function DropdownItem({ children }) {
    return <li className="dropdownItem">{children}</li>
}

export function DropdownNotifications({ children, isRead, onClick }) {
    return <li className={`dropdownNotifications ${isRead ? "isRead" : ""}`} onClick={onClick}>
        {children}
    </li>
}


