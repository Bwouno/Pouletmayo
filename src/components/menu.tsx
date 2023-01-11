interface IProps {
    data: string[]
    onClick?: (index: number) => {} | void
}

const Menu = (props: IProps) => {
    const liElm = props.data.map((label, index) => <li onClick= {() => {
       if (props.onClick) props.onClick(index)
    }}>{label}</li>)
    return <ul>{liElm}</ul>
}

export default Menu