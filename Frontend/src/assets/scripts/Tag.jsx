const Tag = ({name, inMenu, multipleChoice = false, handleClick = undefined}) => {
    
    return (
        <div className={inMenu ? `tag tag-menu` : `tag`} onClick={handleClick !== undefined ? handleClick : () => {}}>
            <h3>{name}</h3>
        </div>)

}


export default Tag;