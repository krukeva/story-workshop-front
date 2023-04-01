export function KeywordData({ keywords, label }) {
  keywords = (Array.isArray(keywords) && keywords) || []

  return (
    <p>
      {label ? `${label} : ` : "Mots-clefs&nbsp;: "}
      {keywords && keywords.length > 0 ? (
        keywords.map((keyword, index) => {
          return (
            <span key={index}>
              {keyword}
              {index < keywords.length - 1 ? ", " : "."}
            </span>
          )
        })
      ) : (
        <em>aucun mot-clef</em>
      )}
    </p>
  )
}

export function KeywordForm({ keywords }) {
  return <div>toto</div>
}
