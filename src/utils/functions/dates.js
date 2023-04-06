export const getDateAndTime = (dateTimeAsString) => {
  if (typeof dateTimeAsString === "undefined") {
    return null
  }

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

// formatter une date FR pour utiliser new Date()
// localString = "dd/mm/yyyy hh:mm:ss"
export const getDateTimefromLocaleString = (localString) => {
  const [date, time] = localString.split(" ")
  const temp = date.split("/")
  const formatedDateTime = [temp[2], temp[1], temp[0]]
    .join("-")
    .concat("T" + time)

  return formatedDateTime
}
