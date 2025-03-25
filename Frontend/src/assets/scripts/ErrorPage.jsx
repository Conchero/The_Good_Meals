import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
const ErrorPage = ({ status, message }) => {


    return (<div className="error__message">
        <FontAwesomeIcon className="error__icon" icon={faTriangleExclamation} />
        <h2>{message}</h2>
    </div>)
}


export default ErrorPage;