export const getDateAndTime = (dateTimeAsString) => {
  const dateTime = new Date(dateTimeAsString)
  const day = dateTime.getDate().toString().padStart(2, "0")
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0")
  const year = dateTime.getFullYear().toString().padStart(4, "0")
  const hours = dateTime.getHours().toString().padStart(2, "0")
  const minutes = dateTime.getMinutes().toString().padStart(2, "0")

  const date = `${year}-${month}-${day}`
  const time = `${hours}:${minutes}`

  return { date: date, time: time }
}
