import { Link } from "react-router";

const Footer = () => {



    return (
        <footer>
            <Link to="/"><h3>See our Recipes</h3></Link>
            <Link to="/new-recipe"><h3>Add a new Recipes</h3></Link>
        </footer>
    )
}


export default Footer;