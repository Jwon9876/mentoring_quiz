import React, {useState} from "react";

import styled from "styled-components";
import Word from "./Word";

const synth = window.speechSynthesis;

// TODO
// 단어 섞는 부분 분리


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
		const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\/\s/\-]/gi;
		
		// TODO
		// " " -> ""
		word = word.replaceAll(" ", "").toUpperCase();
		
		const meaningArr = value.meaning.replaceAll(" ", "").split(",");
		
		meaningArr.map((v) => {
			console.log(v.replaceAll(reg, ""));
		});
		console.log(meaningArr)
		
		setIsDisabled(true);
		
		if (word == value.word.toUpperCase() && meaningArr.includes(meaning)) {
			window.confirm("정답");
			setIsCorrect(true);
			return
		}
		
		window.confirm("오답");
		setIsCorrect(false);
		console.log(meaningArr)
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
					marginBottom: 20,
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
					// onChange={(e) => setWord(e.target.value)}
					onChange={(e) => {
						temp[index] = {...temp[index], word: e.target.value};
						console.log(temp)
					}}
					disabled={isDisabled}
				>
				
				</Input>
				
				<Input
					isCorrect={isCorrect}
					placeholder={"뜻을 입력하세요."}
					// onChange={(e) => setMeaning(e.target.value)}
					onChange={(e) => {
						temp[index] = {...temp[index], meaning: e.target.value};
						console.log(temp)
					}}
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
	
	const shuffle = () => (Math.random() - 0.5);
	const shuffled = [...Word].sort(shuffle);
	
	console.log(JSON.stringify(shuffled, null, 4));
	
	return (
		<Container>
			<FixedHeader></FixedHeader>
			<div
				style={{height: "100px"}}
			>
			</div>
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

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 75px;
  padding: 1rem;
  color: #fff;
  background: teal;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
