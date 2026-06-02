

function Button(props: { label: string, disabled?: boolean, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    console.log('Button rendered', props.label,props.disabled)
  return (
    <button onClick={props.onClick} className={props.disabled ? "bg-gray-300 text-gray-100 px-4 py-2 rounded" : props.label === "Delete" ? "bg-red-500 text-white px-4 py-2 rounded cursor-pointer" : "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"} disabled={props.disabled}>
      {props.label}
    </button>
  )
}

export default Button