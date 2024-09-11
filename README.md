## 개발자

<table>
  <tr>
    <td align="center"><a href="https://github.com/SungRok1231"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FqbCv6%2FbtsIXxt5qwe%2FVeLukDlv9fELHXxYCbYIkK%2Fimg.png" width="100px;" alt=""/><br /><sub><b>김성록</b></sub></a><br />
  </tr>
</table>

## 모듈화 맵

 <tr>
    <td align="center"><a href="https://oxy10023.tistory.com/"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fuam03%2FbtsJAhJw6xT%2FLGu2Tj2dhLuvXqgB9GC110%2Fimg.png" width="800px;" alt=""/><br /></a><br />
</tr>

## 아이템 시뮬레이터 기능

### API 명세서

**Endpoint:** `로그인(인증발급)`

```http
POST /api/users/auth/signin
```

```http
Request
{
	"email": "email",
	"password": "password"
}

Response
{
	"message": "로그인 완료"
}

Response(error)
#(409) { "message": '이미 존재하는 이메일 또는 비밀번호' }
```

**Endpoint:** `회원가입`

```http
POST /api/users/signup
```

```http
Request
{
	"email": "email",
	"password": "password"
}

Response
{
	"message": "회원가입 완료"
}

Response(error)
#(404){ "message": '존재하지 않는 이메일' }
#(404){ "message": '비밀번호가 일치하지 않음.' }
```

**Endpoint:** `캐릭터 생성(인증)`

```http
POST /api/character/auth/new
```

```http
Request
{
	"name":"CharacterName"
}

Response
{
	"data": {
		"characterId": characterId,
		"userId": userId,
		"name": "CharacterName",
		"health": Int,
		"porwer": Int,
		"money": Int
	}
}

Response(error)
#(409) { "message": '중복된 캐릭터 이름' }
```

**Endpoint:** `캐릭터 목록 조회`

```http
GET /api/character/list
```

```http
Request
{ }

Response
{
	"data": [
		{
			"characterId": characterId,
			"userId": userId,
			"name": "characterName",
			"health": Int,
			"power": Int,
			"money": Int
		},
		{
			"characterId": characterId,
			"userId": userId,
			"name": "characterName",
			"health": Int,
			"power": Int,
			"money": Int
		}
	]
}
```

**Endpoint:** `캐릭터 상세 조회`

```http
GET /api/character/:characterId
```

```http
Request
{ }

Request Authorization 헤더
 ㄴBearer Token 미전달시 "money": Int 제외

Response
{
	"data": {
		"characterId": characterId,
		"name": "name",
		"health": Int,
		"porwer": Int,
		"money": Int
	}
}
```

**Endpoint:** `캐릭터 삭제(인증)`

```http
DELETE /api/character/delete/auth/:id
```

```http
Request
{  }

Response
{
	"message": "캐릭터가 삭제되었습니다.",
	"deletedCharacter": {
		"characterId": characterId,
		"userId": userId,
		"name": "characterName",
		"health": Int,
		"power": Int,
		"money": Int
	}
}

Response(error)
#(400) { "message": "요청한 사용자의 토큰이 존재하지 않습니다." }
#(404) { "message": "삭제 할 캐릭터가 없습니다" }
#(500) { "message": '캐릭터 삭제 중 에러 발생' }
```

**Endpoint:** `아이템 생성`

```http
POST /api/item/create
```

```http
Request
{
  "itemName": "itemName",
  "itemStat": {"health": Int, "power": Int},
  "itemPrice": Int
}


Response
{
  "characterId": characterId
  "itemName": "itemName",
  "itemStat": {"health": Int, "power": Int},
  "itemPrice": Int
}
```

**Endpoint:** `아이템 수정`

```http
UPDATE(PUT) /api/item/edit/:itemId
```

```http
Request
{
	"itemName": "new itemName",
	"itemStat": {"health":new Int, "power": new Int}
}

Response
{
	"updatedItem": {
		"itemId": itemId,
		"itemName": "itemName",
		"itemStat": {
			"power": Int,
			"health": Int
		},
		"itemPrice": Int
	}
}
```

**Endpoint:** `아이템 목록 조회`

```http
GET /api/item/list
```

```http
Request
{ }

Response
{
	"data": [
		{
			"itemId": itemId,
			"itemName": "itemName",
			"itemStat": {
				"power": Int,
				"health": Int
			},
			"itemPrice": Int
		},
		{
			"itemId": itemId,
			"itemName": "itemName",
			"itemStat": {
				"power": Int,
				"health": Int
			},
			"itemPrice": Int
		},
	]
}
```

**Endpoint:** `아이템 상세 조회`

```http
GET /api/item/detail/:itemId
```

```http
Request
{ }

Response
{
	"data": {
		"itemId": itemId,
		"itemName": "itemName",
		"itemStat": {"power": Int, "health": Int},
		"itemPrice": Int
	}
}
```

**Endpoint:** `아이템 삭제(인증)`

```http
DELETE /api/item/delete/auth/:id
```

```http
Request
{  }

Response
{
	"message": "아이템이 삭제되었습니다.",
	"deletedItem": {
		"itemId": itemId,
		"itemName": "itemName",
		"itemStat": {
			"power": Int,
			"health": Int
		},
		"itemPrice": Int
	}
}

Response(error)
#(400) { "message": "요청한 사용자의 토큰이 존재하지 않습니다." }
#(404) { "message": "삭제 할 아이템이 없습니다" }
#(500) { "message": '아이템 삭제 중 에러 발생' }
```

## Status Codes ( 상태 코드 )

```
- 200 OK` - 요청이 성공했으며 응답에 요청된 데이터가 포함되어 있습니다.
- 201 생성됨` - 요청이 성공하여 리소스가 생성되었습니다.
- 400 잘못된 요청` - 요청을 이해할 수 없거나 필수 매개변수가 누락되었습니다.
- 404 찾을 수 없음` - 요청된 리소스를 찾을 수 없습니다.
- 409 중복된 요청` - 이미 존재하는 데이터와 중복이 발생했습니다
- 500 내부 서버 오류` - 서버에서 오류가 발생했습니다.
```