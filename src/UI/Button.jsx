export default function Button({children, className}) {
return <button className={`btn ${className}`}>{children}</button>
}