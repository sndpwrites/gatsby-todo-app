import React, { useEffect, useState } from "react"
const url = "http://localhost:3000/notes"
export default function Home() {
  const [data, setData] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [refreshRequired, setRefreshRequired] = useState(false)
  const [userActionMessage, setUserActionMessage] = useState("")
  useEffect(() => {
    fetch(`${url}/`)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson)
        setRefreshRequired(false)
      })
      .catch(error => console.log("error", error))
  }, [refreshRequired])
  function handleDelete(element) {
    fetch(`${url}/${element.id}/delete`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(resp => {
        setUserActionMessage(resp.responseMessage)
        setRefreshRequired(true)
      })
  }
  function handleAdd(title, description) {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    fetch(`${url}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ title: title, description: description }),
    })
      .then(res => res.json())
      .then(resp => {
        setUserActionMessage(resp.responseMessage)
        setNewTitle("")
        setNewDescription("")
        setRefreshRequired(true)
      })
  }

  return (
    <div className="container">
      <table>
        <caption>To Do Note List</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan="5">
              <p>
                {data.length} record(s). {userActionMessage}
              </p>
            </td>
          </tr>
        </tfoot>
        <tbody>
          {data.map((el, idx) => (
            <tr key={idx}>
              <td>{el.id}</td>
              <td>{el.timestamp}</td>
              <td>{el.title}</td>
              <td>{el.description}</td>

              <td>
                <button className="btn-delete" onClick={() => handleDelete(el)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="2"></td>

            <td>
              <input
                type="text"
                value={newTitle}
                autoFocus={true}
                placeholder="Title"
                onChange={e => setNewTitle(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                type="text"
                value={newDescription}
                placeholder="Description"
                onChange={e => setNewDescription(e.target.value)}
              ></input>
            </td>
            <td>
              <button
                className="btn-add"
                onClick={() => handleAdd(newTitle, newDescription)}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
