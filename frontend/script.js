
//변수 생성
let userMessages = [];
let assistantMessages = [];

let myDateTime = '';

function start(){
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    if(date === ''){
        alert('생년월일을 입력해 주세요.');
        return;
    }
    myDateTime = date + hour;
    
    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";

    //console.log(myDateTime);
}

async function sendMessage() {
    // 사용자 메세지 가져옴
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    //채팅 말풍선에 사용자의 메세지 출력
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user-bubble';
    userBubble.textContent = message;
    document.getElementById('fortuneResponse').appendChild(userBubble);

    //userMessages에 사용자의 메세지 저장
    userMessages.push(messageInput.value);


    //입력 필드 초기화
    messageInput.value = '';

    //백엔드 서버에 메세지를 보내고 응답 출력
    try {

        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                myDateTime: myDateTime,
                userMessages: userMessages,
                assistantMessages: assistantMessages,
            })
        });
        if (!response.ok){
            throw new Error('Request failed with status '+response.status);
        }
        const data = await response.json();        
        console.log('Response:', data.assistant);


        //채팅 말풍선에 챗gpt 응답 출력
         const botBubble = document.createElement('div');
         botBubble.className = 'chat-bubble bot-bubble';
         botBubble.textContent = data.assistant;
         document.getElementById('fortuneResponse').appendChild(botBubble);

        //assistantMessages에 챗gpt 메세지 저장
        assistantMessages.push(data.assistant);


    }catch(error){
        console.error('Error : ',error);
    }
}