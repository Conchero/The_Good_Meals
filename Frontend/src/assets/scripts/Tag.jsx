const Tag = ({name, inMenu, multipleChoice = false, handleClick = undefined}) => {
    
    return (
        <div className={inMenu ? `tag tag-menu ${name}` : `tag no-mouse-event`} onClick={handleClick !== undefined ? handleClick : () => {}}>
            <h3 className="no-mouse-event">{name}</h3>
        </div>)

}


export default Tag;