export default function Square({ text, callback }) {
  return <div className="square" onClick={callback}>{text}</div>
} 