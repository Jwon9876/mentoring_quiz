import React, {useState} from "react";

import styled from "styled-components";

const synth = window.speechSynthesis;

const Word = [
	{
		word: "World",
		meaning: "세계, 지구"
	},
	{
		word: "Head",
		meaning: "머리"
	}
];

// TODO
// 각각 직접 채점 방식 -> 제출 시 전체 한번에 자동 채점 방식
const temp = {};

const WordSection = ({index, value}) => {
	
	const utterance = new SpeechSynthesisUtterance();
	utterance.lang = "en-US"
	utterance.text = value.word
	
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
				
				<Button onClick={() => answerCheck(word, meaning)}>
					정답 확인
				</Button>
			</AnswerSection>
		</QuizSection>
	)
}


const App = () => {
	
	
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
  padding: 15px;
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
