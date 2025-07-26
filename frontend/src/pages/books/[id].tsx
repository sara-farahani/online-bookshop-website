import { useParams } from "react-router-dom";
import BookDetails from "../../components/bookDetails/BookDetails";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();

  return <BookDetails bookID={id} />;
}
