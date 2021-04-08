# check-in 

בס"ד

Checkin API

### Functions:

Get games and their fields :

URL:  [https://checkin.carmel6000.com/api/game/gameToFields](https://checkin.carmel6000.com/api/game/gameToFields/?munOfGames=[NUMBER)

Method: GET

Parameters:

-   [numOfGame](https://checkin.carmel6000.com/api/game/gameToFields/?munOfGames=[NUMBER)s:  The number of games to get.

-   skipON: Number of results to skip.

Example:

fetch("https://checkin.carmel6000.com/api/game/gameToFields/?num  OfGames=5&skipON=0", { method: 'GET'  }).then(response => response.json()).then(data => console.log(data));

Get games for the student's class :

URL:  [https://checkin.carmel6000.com/](https://checkin.carmel6000.com/api/game/gameToFields/?munOfGames=[NUMBER)api/student/gamesAndStudentInfo

Method: GET

Parameters:

-   username: student username 

-   password: student password

Example:

fetch("[https://checkin.carmel6000.com/](https://checkin.carmel6000.com/api/game/gameToFields/?munOfGames=[NUMBER)api/student/gamesAndStudentInfo/?username=student1@gmail.com&password=student11", { method: 'GET'  }).then(response => response.json()).then(data => console.log(data));