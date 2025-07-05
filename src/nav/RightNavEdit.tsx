import { Link } from "react-router"
import { LuFileWarning } from "react-icons/lu"
import { RxReader } from "react-icons/rx"
import { AiOutlineDelete } from "react-icons/ai"

export default function RightNavEdit({
  doc_id,
  onDeleteDoc,
  docType,
}: {
  doc_id: number
  onDeleteDoc: React.MouseEventHandler<HTMLLIElement>
  docType: string
}) {
  return (
    <ul style={{ paddingLeft: 0, listStyle: "none" }} className="list-item">
      <li>
        <RxReader size={16} color="#2d2d2d" />
        <Link to={`/view/${docType}/${doc_id}`}>Read</Link>
      </li>
      <li onClick={onDeleteDoc}>
        <AiOutlineDelete size={16} color="#2d2d2d" />
        <Link to="#">Delete</Link>
      </li>
      <li>
        <LuFileWarning size={16} color="#2d2d2d" />
        <Link to="#">Report</Link>
      </li>
    </ul>
  )
}
