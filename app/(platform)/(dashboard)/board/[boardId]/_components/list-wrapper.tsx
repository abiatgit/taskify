interface ListWarapperProps{
    children:React.ReactNode
}


export const ListWrapper=({children}:ListWarapperProps)=>{
return(
    <li className="shrink-0 h-full w-[273px] select-none">
        {children}
    </li>
)
}