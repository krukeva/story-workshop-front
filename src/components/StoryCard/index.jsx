import { useNavigate } from "react-router-dom"

import Card from "../../utils/templates/Card"
import { DeleteButton } from "../../components/buttons"
import QuillReader from "../../components/QuillReader"

export default function StoryCard({ story }) {
  const navigate = useNavigate()

  return (
    <Card openLink={`/stories/${story.id}`}>
      <Card.Header openLink={`/stories/${story.id}`}>
        <Card.Header.Title>
          <span>{story.name}</span>
        </Card.Header.Title>
        <Card.Header.Buttons>
          <DeleteButton
            type="button"
            onClick={() => navigate(`/stories/${story.id}/delete`)}
          />
        </Card.Header.Buttons>
      </Card.Header>
      <Card.Body>
        {story.description ? (
          <QuillReader value={story.description} />
        ) : (
          <>
            <em>Aucune description disponible.</em>
          </>
        )}
      </Card.Body>
      <Card.Footer>
        <span>
          Mots-clefs&nbsp;:{" "}
          {story.keywords &&
            story.keywords.map((keyword, index) => (
              <span key={index}>
                {keyword}
                {index < story.keywords.length - 1 && ", "}
              </span>
            ))}
        </span>
      </Card.Footer>
    </Card>
  )
}
