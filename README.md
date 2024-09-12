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
- 409 중복된 요청` - 이미 존재하는 데이터와 중복이 발생했습니다.
- 500 내부 서버 오류` - 서버에서 오류가 발생했습니다.
```

## Q&A


1. **암호화 방식**
    - 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?
		```
		단방향 암호화에 해당합니다
		```

    - 비밀번호를 그냥 저장하지 않고 Hash 값을 저장 했을 때의 좋은 점은 무엇인가요?
		```
		비밀번호를 저장할 때 해싱 방식은 단방향 암호화로 원래의 비밀번호를 복구하기 어렵습니다
		해싱된 값이 유출되더라도 원본 비밀번호를 알기 어려운 장점이 있지만 완전히 불가능한 것은 아닙니다

		예를 들어 Lookup table attack이나 Rainbow table attack 같은 공격 방식을 통해
		해커들이 해싱된 값을 추론할 수 있습니다
		이런 공격은 미리 계산된 해시 값을 사용하여 원본 비밀번호를 찾아내는 방법입니다

		이를 방지하기 위한 방법으로 솔트(salt)나 페퍼(pepper)를 사용하고
		솔트는 랜덤한 문자를 원본 비밀번호에 추가한 후 해싱하는 방식으로
		동일한 비밀번호라도 해시 결과가 다르게 만들어 공격을 어렵게 만들고
		비밀번호 보안을 더욱 강화할 수 있는 장점이 있습니다

		정리하자면 : 본 프로젝트에 사용한 bcrypt는 해싱 할 때 솔트(salt)를 자동으로 해주기 때문에 보안에
					조금더 유리 하다는 장점이 있습니다
		```

2. **인증 방식**
    - JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?
		```
		Access Token은 중요한 인증수단 으로 사용되기 때문에 게임으로 치면 다른사람이 나의 게임 아이템과
		자산에 접근 할 수도 있는 큰문제점을 유발하고 API를 무제한 호출하여 서버에 장애를 유발 할 수도 있습니다
		```

    - 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
		```
		Access Token의 유효 기간을 짧게 설정하고 Refresh Token을 함께 사용하여 보완하는 방법이 있습니다
		```


3. **인증과 인가**
    - 인증과 인가가 무엇인지 각각 설명해 주세요.
		```
		<인증>은 사용자가 누구인지 확인하는 것이고 <인가>는 <인증>이 끝난 사용자에게 접근 권한을 부여하는 것입니다 
		```

    - 위 API 구현 명세에서 인증을 필요로 하는 API와 그렇지 않은 API의 차이가 뭐라고 생각하시나요?
		```
		인증이 필요한 API들은 보통 개인정보나 자산과 관련있거나 시스템에 장애를 유발할수 있는 모든API가
		있을수 있겠고
		인증이 필요하지 않은 API는 누구나 접근해도 개인정보,자산,시스템 등에 문제를 주지않는 것들이 해당합니다
		```

    - 아이템 생성, 수정 API는 인증을 필요로 하지 않는다고 했지만 사실은 어느 API보다도 인증이 필요한 API입니다. 왜 그럴까요?
		```
		게임에서 아이템 생성, 수정 API는 게임 로직과 시스템에 치명적 무리를 만들수 있으며
		데이터베이스에 아이템테이블을 공격할수 있습니다
		```

4. **Http Status Code**
    - 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.
		```
		- 200 OK` - 요청이 성공했으며 응답에 요청된 데이터가 포함되어 있습니다.
		- 201 생성됨` - 요청이 성공하여 리소스가 생성되었습니다.
		- 400 잘못된 요청` - 요청을 이해할 수 없거나 필수 매개변수가 누락되었습니다.
		- 404 찾을 수 없음` - 요청된 리소스를 찾을 수 없습니다.
		- 409 중복된 요청` - 이미 존재하는 데이터와 중복이 발생했습니다.
		- 500 내부 서버 오류` - 서버에서 오류가 발생했습니다.
		```


5. **게임 경제**
    - 현재는 간편한 구현을 위해 캐릭터 테이블에 money라는 게임 머니 컬럼만 추가하였습니다.
        - 이렇게 되었을 때 어떠한 단점이 있을 수 있을까요?
		```
		보안적인 부분에서 취약점이 발생합니다 LOG를 남겨서 조작을 추적하는데도 어려움있습니다
		또 캐릭터 테이블에 money를 추가하면 테이블구조가 매우 비대해질 수 있습니다
		마지막으로 비즈니스 로직이 복잡해질수로 연관된 데이터 관리가 어렵고 충돌이 발생할 수 있습니다
		```

        - 이렇게 하지 않고 다르게 구현할 수 있는 방법은 어떤 것이 있을까요?
		```
		별도의 보안테이블을 두고 User 1:1관계로 연결해서 관리하는것이 더 효율적이고 좋은방법이라고 생각합니다
		보안성을 높이고 log를 기록하고 관리하기 쉬우며 충돌을 방지할수 있습니다
		```

    - 아이템 구입 시에 가격을 클라이언트에서 입력하게 하면 어떠한 문제점이 있을 수 있을까요?
		```
		다양한 attack을 당할수 있습니다 인풋값에 코드를 작성해서 attack을 할수도있고
		게임 시스템에 큰 영향을 줘서 특정게임음 서비스종료를 해야할수도 있습니다
		```