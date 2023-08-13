import React, {useState} from "react";

import styled from "styled-components";

const synth = window.speechSynthesis;

// TODO
// 단어 섞는 부분 분리
const Word = [
    {
        "word": "combine",
        "meaning": "그만두게 하다, 단념시키다, 낙담시키다, 실망시키다"
    },
    {
        "word": "discount",
        "meaning": "할인, 할인하다, 중요하지 않게 생각하다"
    },
    {
        "word": "inevitable",
        "meaning": "피할 수 없는, 불가피한"
    },
    {
        "word": "uneasy",
        "meaning": "불안한, 불편한, 걱정스러운, 편치 않은"
    },
    {
        "word": "disappear",
        "meaning": "사라지다, 없어지다, 소멸하다"
    },
    {
        "word": "unfortunate",
        "meaning": "불운한, 불행한, 유감스러운"
    },
    {
        "word": "display",
        "meaning": "전시하다, 진열하다, 보이다, 표현하다, 전시, 진열, 보이기, 표현"
    },
    {
        "word": "support",
        "meaning": "지지하다, 부양하다, 지지, 받치다, 지원, 받침"
    },
    {
        "word": "dismiss",
        "meaning": "묵살하다, 일축하다, 해고하다, 내쫓다, 해산시키다"
    },
    {
        "word": "advantage",
        "meaning": "이점, 유리한 조건, 유리한 입장"
    },
    {
        "word": "unusual",
        "meaning": "보통이 아닌, 유별난, 색다른, 평소와 다른"
    },
    {
        "word": "superficial",
        "meaning": "표면의, 외관상의, 피상적인"
    },
    {
        "word": "disagree",
        "meaning": "동의하지 않다, 일치하지 않다, 다르다"
    },
    {
        "word": "submarine",
        "meaning": "잠수함, 해저의"
    },
    {
        "word": "suppress",
        "meaning": "진압하다, 억제하다, 참다, 억누르다"
    },
    {
        "word": "irrelevant",
        "meaning": "관계가 없는, 상관없는"
    },
    {
        "word": "upright",
        "meaning": "똑바른, 수직으로 세운, 올바른, 정직한, 똑바로, 수직으로, 수직 기둥"
    },
    {
        "word": "surface",
        "meaning": "표면, 외관, 올라오다, 드러나다, 나타나다"
    },
    {
        "word": "differ",
        "meaning": "다르다, 일치하지 않다"
    },
    {
        "word": "ancient",
        "meaning": "고대의, 옛날의"
    },
    {
        "word": "antibiotic",
        "meaning": "항생제, 항생 물질"
    },
    {
        "word": "disorder",
        "meaning": "무질서, 혼란, 이상, 불편"
    },
    {
        "word": "sovereign",
        "meaning": "통치자, 주권이 있는, 최고 권력의"
    },
    {
        "word": "upside",
        "meaning": "위쪽, 윗면, "
    },
    {
        "word": "immoral",
        "meaning": "부도덕한"
    },
    {
        "word": "superb",
        "meaning": "뛰어난, 멋진"
    },
    {
        "word": "antibody",
        "meaning": "항체"
    },
    {
        "word": "dispose",
        "meaning": "배치하다, 배열하다, 처분하다, 없애다, 처리하다, 해결하다, 경향을 갖게 하다"
    },
    {
        "word": "anticipate",
        "meaning": "예상하다, 예측하다, 기대하다"
    },
    {
        "word": "advance",
        "meaning": "진보하다, 전진, 진보, 전진하다, 진보시키다"
    },
    {
        "word": "inexpensive",
        "meaning": "비싸지 않은, 저렴한"
    },
    {
        "word": "antique",
        "meaning": "고대의, 골동품"
    },
    {
        "word": "suggest",
        "meaning": "제안하다. 제의하다, 암시하다, 시사하다"
    },
    {
        "word": "superior",
        "meaning": "우수한, 보다 나은, 상위의, 상급의, 상급자"
    },
    {
        "word": "upset",
        "meaning": "기분이 상한, 상하게 하다, 화난, 탈이 난, 뒤집어 엎다"
    },
    {
        "word": "unlock",
        "meaning": "열다"
    },
    {
        "word": "unlikely",
        "meaning": "~할 것 같지 않은, 가망 없는"
    },
    {
        "word": "antarctic",
        "meaning": "남극의, 남극 대륙"
    },
    {
        "word": "suffer",
        "meaning": "겪다, ~로 괴로워하다, 앓다"
    },
    {
        "word": "independent",
        "meaning": "독립한, 자주의, 독립심이 강한"
    },
    {
        "word": "illegal",
        "meaning": "불법의"
    },
    {
        "word": "ancestor",
        "meaning": "선조, 조상"
    },
    {
        "word": "immune",
        "meaning": "면역성을 가진, 면제된"
    },
    {
        "word": "uphold",
        "meaning": "지지하다, 옹호하다"
    },
    {
        "word": "unfair",
        "meaning": "불공평한, 부당한"
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
					// ue};	temp[index] = {...temp[index], word: e.target.val
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
