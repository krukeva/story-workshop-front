import { useNavigate } from "react-router-dom"

import Card from "../../utils/templates/Card"
import { DeleteButton } from "../../components/buttons"
import QuillReader from "../../components/QuillReader"

export default function WorldCard({ world, isUsed }) {
  const navigate = useNavigate()

  return (
    <Card openLink={`/worlds/${world.id}`}>
      <Card.Header openLink={`/worlds/${world.id}`}>
        <Card.Header.Title>
          <span>{world.name}</span>
        </Card.Header.Title>
        {!isUsed && (
          <Card.Header.Buttons>
            <DeleteButton
              type="button"
              size="25px"
              fontSize="12px"
              onClick={() => navigate(`/worlds/${world.id}/delete`)}
            />
          </Card.Header.Buttons>
        )}
      </Card.Header>
      <Card.Body>
        {world.description ? (
          <QuillReader value={world.description} />
        ) : (
          <>
            <em>Aucune description disponible.</em>
          </>
        )}
      </Card.Body>
      <Card.Footer>
        <span>
          Mots-clefs&nbsp;:{" "}
          {world.keywords &&
            world.keywords.map((keyword, index) => (
              <span key={index}>
                {keyword}
                {index < world.keywords.length - 1 && ", "}
              </span>
            ))}
        </span>
      </Card.Footer>
    </Card>
  )
}
