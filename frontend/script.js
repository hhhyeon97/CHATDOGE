// 변수 생성
let userMessages = [];
let assistantMessages = [];

let myDateTime = '';

let isChatting = false;  // 초기에는 채팅 중이 아님

function start() {
  const date = document.getElementById('date').value;
  const hour = document.getElementById('hour').value;
  if (date === '') {
    alert('생년월일을 입력해 주세요 !');
    return;
  }
  myDateTime = date + hour;

  document.getElementById("intro").style.display = "none";
  document.getElementById("chat").style.display = "block";
  document.getElementById("ad").style.display = "none";
  document.getElementById("in").style.display = "block";

   // 챗 부분 처음에는 숨겨짐
   document.querySelector('.user-bubble').style.display = 'none';
   document.querySelector('.bot-bubble').style.display = 'none';
}

function handleKeyPress(event) {
  // 엔터 키를 눌렀을 때
  if (event.key === 'Enter') {
    sendMessage();
  }
}

async function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (message === '') {
    alert('메세지를 입력해주세요!');
    messageInput.value = ''; // 입력창의 내용 초기화
    messageInput.focus();
    return;
  }


  // 로딩 스피너 보여주기 - > 로딩 메세지 보여주기 
  document.getElementById('loader-message').style.display = "block";
  document.getElementById('noneani').style.display = "block";


  // 사용자 메세지 출력
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user-bubble';

 // 유저 아이콘 추가
const userIcon = document.createElement('i');
userIcon.className = 'bx bxs-user';
userIcon.style.marginRight = '5px'; // 아이콘과 메시지 사이의 간격 조절
userIcon.style.color = '#a1a09a'; // 아이콘 색상 변경
userIcon.style.fontWeight ='bold';
userBubble.appendChild(userIcon);

// 메세지 추가
const messageNode = document.createTextNode(message);
userBubble.appendChild(messageNode);
//userBubble.textContent = message;
document.getElementById('chat').appendChild(userBubble);


  //사용자 메시지를 보낼 때만 표시
  //document.querySelector('.user-bubble').style.display = 'block';

  // 사용자 메세지 저장
  userMessages.push(message);

  // 입력 필드 초기화
  messageInput.value = '';


 // 채팅 중 상태 변경
 isChatting = true;
 console.log(isChatting);

// 입력 폼 비활성화 및 placeholder 텍스트 변경
messageInput.disabled = true;
//messageInput.placeholder = '답변 중에는 메세지를 보낼 수 없습니다.';

// 전송 버튼 비활성화
document.getElementById('sendButton').disabled = true;


  // 백엔드 서버에 메세지를 보내고 응답 출력
  try {
    const response = await fetch('https://totqmestykrevynhnnuolqpsju0ebsbo.lambda-url.ap-northeast-2.on.aws/fortuneTell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        myDateTime: myDateTime,
        userMessages: userMessages,
        assistantMessages: assistantMessages,
      })
    });

    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }

    const data = await response.json();
    // console.log('Response:', data.assistant);

    // 로딩 스피너 숨기기 - > 로딩 메세지 숨기기 
    document.getElementById('loader-message').style.display = "none";
    document.getElementById('noneani').style.display = "none";



   // 채팅 말풍선에 챗GPT 응답 출력
const botBubble = document.createElement('div');
botBubble.className = 'chat-bubble bot-bubble';

// 챗GPT 아이콘 추가
const botIcon = document.createElement('i');
botIcon.className = 'bx bxs-star';
botIcon.style.marginRight = '5px'; // 아이콘과 메시지 사이의 간격 조절
botIcon.style.color = '#ebe9c3'; // 아이콘 색상 변경
botIcon.style.fontWeight ='bold';
botBubble.appendChild(botIcon);

// 챗GPT 응답 메시지 추가
const botMessageNode = document.createTextNode(data.assistant);
botBubble.appendChild(botMessageNode);

document.getElementById('chat').appendChild(botBubble);

// 챗GPT 응답이 있을 때만 표시
document.querySelector('.bot-bubble').style.display = 'block';


// 채팅 중 상태 변경
isChatting = false;
// 입력 폼 활성화 및 placeholder 텍스트 복원
messageInput.disabled = false;
messageInput.placeholder = '메세지를 입력하세요...';
// 전송 아이콘 비활성화
document.getElementById('sendButton').disabled = false;


    // assistantMessages에 챗gpt 메세지 저장
    assistantMessages.push(data.assistant);

  } catch (error) {
    console.error('Error : ', error);
  }
}