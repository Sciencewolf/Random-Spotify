import '../style/App.css'
import Skeleton from "./Skeleton.tsx";
import Login from "../backend/Login.tsx";
import Footer from "./Footer.tsx";


function App() {
    window.onbeforeunload = function() {
        window.localStorage.removeItem("token")
        return;
    }
    return (
        <>
            <Login />
            <Skeleton imgSRC={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO1bS2wcRRAtB/EzIEBmd/q9HnuJMRzMASlGCIQQNy4J4XNJDiAhEEF8AwHDBYGBCMyfnJBBIKEIbvwEJhAQOEhccuKKSDjxyQEBggOfOAGV3buUx+vPbjy7s515Ul12e3q6XlV3V1X3iJQoUaJEiRINJElyGoBrSO4A8FAM4r2/j+RmAP2yDPpIjgP4jeS/MQqAX0ner7pmlV9H8q1uD7CD8uYCEkiOZ5g6QHKK5GQkMhV0siTssHPeuv2rIyMjJ0tkUJ0AvGanA3RN0MXB/PhtjMrXobqRPGiMvUkJeMAQ8LJEjjC1/58GACYMARMSORbpi5IAtO0B1Wo1IblVXSnI1iRJqhK7B3jvLwIwTfJIkz32CIAPtY3ESACAbQD+WUWwcRjAdomJAJK3ZwKmv0nuAfCcCsmPw2+NNs652yQGAvy82zcsD+CLJEnOzbZLkmQ9yRlLUpIkF0qvEwDgA2PZmdHR0ZOWaqv/kdxn2r8tvUwAgHNIzhqLrl/pRYODg+cZjzlcq9XOkl4lwDl3vbHmR6t9ma4J5rnN0sMesN0o8uRqX0byafPcndLDBNxjFHmqHQIA3C2RTIE9q30ZyU9M39dJLItgtVodXulFaZqOmEVwVvuQHt8Gp1vcBr80/U5LQXAsBGzQ7cyQsE+tnG2nv1nlQ0i8QWIIhf18edmGwuriewE8D+AFAJ9m8wR9RiJLhh6srwcriLYZz1uh4eHhM1sp461JOkzyskyom5UZ7/2lsgYIU2oLyYdJ7gbwldYuAfzcLB0H8BeA7wF8HTzyjfDsFp2KAJ49ZgLq0JAYwC36XOjn5mYJUivQkJnkTXpOAeCHVXha24IClcTWhVjjPbVgG8r8DuDPNp57tKsEhFr9rQC+WWaQhzT/ALDTOXeDc+5K7/35AwMDZzTpsm9oaOjsNE09gLFwHniXHo4AeJ/kdySPhn6PAriqawSEA1hbo7fb5ud6hkfygrV+b6VSOT1N00ucc6P1gXSUAABDatEm8/FHAI+p9fIeQ3ZAE50iwHu/MazeVvmftNQ2NjZ2onQD6AwBfQAeN/Ov7uo71SWlm0D+BOi9g10Zqx8EcLkUAciXgBP0LD6j/Lt6Ii1FAXIkgOSLGeV3KSlSJCAnAkjekVF+UgoA9T6SL6kk6ol5EBByhUbqrBcTmt3L6QZseQ9apltrAnRV12TF9PlZkdw+9+NxLryAcKhSqTgpEHIlwDl38aJYu2DIlQAuLIXpVTQ5bggAcK1R/o+Ox/TdJoDkfkPAI1JQ5EIAgCtscUJzcjmeCCD5junjGSkwFunL+cJD3XpTrXaol6JMlXjWe59KL90TJHm1YeRAqzdFMyHvXikwarXaKaEsNjde7/1GdYn+cI28Eba2QoLd+pxzN0qBlQfwutHzlzRNT537MzMN5vL1cMN62Q8RQr29UZsH8ES3P45YYpyvWMuHsd6bLVpk8/aYZXez5KwvfCbTmA6xibp9sPzSmSmAfl0Yw0HoZAwSdNnUmPMlSpQoUULm8B/ib+rUpz3KIQAAAABJRU5ErkJggg=="}
                      songName={""}
                      songArtist={""}/>
            <Footer />
        </>
    )
}

export default App
