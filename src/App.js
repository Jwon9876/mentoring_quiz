import React, {useState} from "react";

import styled from "styled-components";

const synth = window.speechSynthesis;

// TODO
// 단어 섞는 부분 분리
const Word = [
    {
        "word": "develop",
        "meaning": "발전하다, 발달하다"
    },
    {
        "word": "derive",
        "meaning": "이끌어내다, 얻다"
    },
    {
        "word": "undergraduate",
        "meaning": "대학생(의), 학부생(의)"
    },
    {
        "word": "represent",
        "meaning": "대변하다, 대표하다, 나타내다"
    },
    {
        "word": "evaporation",
        "meaning": "증발, 발산"
    },
    {
        "word": "dialect",
        "meaning": "방언, 사투리"
    },
    {
        "word": "research",
        "meaning": "연구, 조사, 연구하다"
    },
    {
        "word": "reproduce",
        "meaning": "복제하다, 번식하다"
    },
    {
        "word": "retire",
        "meaning": "은퇴하다, 퇴직하다"
    },
    {
        "word": "exhale",
        "meaning": "내쉬다"
    },
    {
        "word": "detach",
        "meaning": "분리하다, 떼어내다"
    },
    {
        "word": "exaggerate",
        "meaning": "과장하다"
    },
    {
        "word": "expand",
        "meaning": "팽창하다, 확장하다"
    },
    {
        "word": "international",
        "meaning": "국제적인, 국가 간의"
    },
    {
        "word": "explicit",
        "meaning": "뚜렷한, 명백한"
    },
    {
        "word": "exchange",
        "meaning": "교환, 교환하다"
    },
    {
        "word": "declare",
        "meaning": "선언하다, 발표하다"
    },
    {
        "word": "recycle",
        "meaning": "재활용하다"
    },
    {
        "word": "depict",
        "meaning": "그리다, 묘사하다"
    },
    {
        "word": "recall",
        "meaning": "기억해내다, 회상하다"
    },
    {
        "word": "remove",
        "meaning": "제거하다, 옮기다"
    },
    {
        "word": "despise",
        "meaning": "경멸하다, 얕보다"
    },
    {
        "word": "dialogue",
        "meaning": "대화 문답, 회화"
    },
    {
        "word": "depress",
        "meaning": "낙담시키다, 우울하게 하다"
    },
    {
        "word": "depart",
        "meaning": "떠나다, 출발하다"
    },
    {
        "word": "revive",
        "meaning": "소생시키다, 소생하다"
    },
    {
        "word": "remain",
        "meaning": "남아 있다, 머무르다"
    },
    {
        "word": "transplant",
        "meaning": "옮겨 심다, 이식하다"
    },
    {
        "word": "underlie",
        "meaning": "의 기저를 이루다"
    },
    {
        "word": "interfere",
        "meaning": "간섭하다, 방해하다"
    },
    {
        "word": "record",
        "meaning": "기록, 음반, 기록하다"
    },
    {
        "word": "explain",
        "meaning": "설명하다"
    },
    {
        "word": "recover",
        "meaning": "회복하다, 되찾다"
    },
    {
        "word": "transform",
        "meaning": "변형시키다"
    },
    {
        "word": "demonstrate",
        "meaning": "입증하다, 보여주다"
    },
    {
        "word": "replace",
        "meaning": "대신하다, 교체하다"
    },
    {
        "word": "detect",
        "meaning": "발견하다"
    },
    {
        "word": "undergo",
        "meaning": "겪다, 경험하다"
    },
    {
        "word": "undertake",
        "meaning": "맡다, -의 책임을 지다"
    },
    {
        "word": "diameter",
        "meaning": "지름, 직경"
    },
    {
        "word": "interaction",
        "meaning": "상호 작용, 상호 영향"
    },
    {
        "word": "translate",
        "meaning": "번역하다"
    },
    {
        "word": "transfer",
        "meaning": "이동시키다, 전학하다"
    },
    {
        "word": "expose",
        "meaning": "노출시키다, 드러내다"
    },
    {
        "word": "interpret",
        "meaning": "통역하다, 해석하다"
    },
    {
        "word": "exhaust",
        "meaning": "지치게 하다, 고갈시키다, 배기가스"
    },
    {
        "word": "debate",
        "meaning": "토론, 논쟁, 토론하다"
    }
];

// TODO
// 각각 직접 채점 방식 -> 제출 시 전체 한번에 자동 채점 방식
const temp = {};

const WordSection = ({index, value}) => {
	
	const utterance = new SpeechSynthesisUtterance();
	utterance.lang = "en-US"
	utterance.text = value.word
	utterance.rate = 0.95
	
	const [word, setWord] = useState("");
	const [meaning, setMeaning] = useState("");
	
	const [isDisabled, setIsDisabled] = useState(false);
	
	const [isCorrect, setIsCorrect] = useState(null);
	
	const answerCheck = (word, meaning) => {
		word = word.toUpperCase();
		const meaningArr = value.meaning.split(", ");
		
		setIsDisabled(true);
		
		if (word == value.word.toUpperCase() && meaningArr.includes(meaning)) {
			window.confirm("정답");
			setIsCorrect(true);
			return
		}
		
		window.confirm("오답");
		setIsCorrect(false);
		return
		
	}
	
	return (
		<QuizSection
			key={index}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					marginBottom: 20
				}}
			>
				<div
					style={{
						marginRight: 10
					}}
				>
					{index + 1}번
				</div>
				<Button onClick={() => synth.speak(utterance)}>
					단어듣기
				</Button>
			</div>
			
			<AnswerSection>
				<Input
					isCorrect={isCorrect}
					placeholder={"단어를 입력하세요."}
					onChange={(e) => setWord(e.target.value)}
					// onChange={(e) => {
					// 	temp[index] = {...temp[index], word: e.target.value};
					// 	console.log(temp)
					// }}
					disabled={isDisabled}
				>
				
				</Input>
				
				<Input
					isCorrect={isCorrect}
					placeholder={"뜻을 입력하세요."}
					onChange={(e) => setMeaning(e.target.value)}
					// onChange={(e) => {
					// 	temp[index] = {...temp[index], meaning: e.target.value};
					// 	console.log(temp)
					// }}
					disabled={isDisabled}
				>
				
				</Input>
				
				<Button disabled={isDisabled} onClick={() => answerCheck(word, meaning)}>
					정답 확인
				</Button>
			</AnswerSection>
		</QuizSection>
	)
}


const App = () => {
	
	const shuffle = () => ( Math.random() - 0.5 );
	const shuffled = [...Word].sort(shuffle);
	
	console.log(JSON.stringify(shuffled, null, 4));
	
	return (
		<Container>
			{
				Word.map((v, i) => (
					<WordSection index={i} value={v}/>
				))
			}
		
		</Container>
	);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuizSection = styled.div`
  height: 100px;
  border-bottom: 1px solid;
  padding: 60px;
`;

const AnswerSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  border: 1px solid;
  background: ${props => props.isCorrect == null ? "" : (props.isCorrect ? "#9cdc9e" : "#dc7f81")};
  color: black;
  font-size: 25px;
  margin-right: 10px;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const Button = styled.button`
  height: auto;
  border: 1px solid;
  border-radius: 10px;
`;

export default App;
