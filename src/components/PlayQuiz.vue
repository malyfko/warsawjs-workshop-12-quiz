<template>
  <div>
    <div v-if="gameStatus === 'playing'" class="quiz">
      <div class="question">
        {{ getQuestion }}
      </div>
      <ul class="answers-list">
        <li class="answer" v-for="(answer, index) in getAnswers" v-on:click="goToNextQuestion(index)">
          {{ answer }}
        </li>
      </ul>
    </div>
    <div v-else class="final-screen">
      <div v-if="correctAnswers === getCurrentQuiz.questions.length" class="success">
        You won!
      </div>
      <div v-else class="failure">
        You lost!
      </div>
      <button class="restart-button" v-on:click="restartQuiz">Play again</button>
    </div>
    <div class="progress">Correct answers: {{ correctAnswers }}/{{ getCurrentQuiz.questions.length }}</div>
  </div>
</template>

<script>
  import quizzes from '@/db/quizzes';

  export default {
    name: 'PlayQuiz',
    data () {
      return {
        quizzes: quizzes.quizzes,
        questions: quizzes.quizzes[0].questions,
        currentQuizIndex: 0,
        currentQuestionIndex: 0,
        gameStatus: 'playing',
        correctAnswers: 0,
      }
    },
    computed: {
      getCurrentQuiz() { return this.quizzes[this.currentQuizIndex] },
      getCurrentQuestion() { return this.questions[this.currentQuestionIndex] },
      getQuestion() { return this.getCurrentQuestion.text; },
      getAnswers() { return this.getCurrentQuestion.answers },
    },
    methods: {
      increaseStep() { this.currentQuestionIndex++ },
      increaseCorrectAnswers() { this.correctAnswers++ },
      setGameStatus(status) { this.gameStatus = status; },
      goToNextQuestion(index) {
        if (index === this.getCurrentQuestion.correctAnswerIndex){
          this.correctAnswers++;
        }
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.increaseStep();
        } else {
          this.setGameStatus('end');
        }
      },
      restartQuiz() {
        this.setGameStatus('playing');
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
      },
    }
  }
</script>

<style>
  .answers-list {
    list-style: none;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .answer {
    display: flex;
    border: 1px solid;
    margin: 5px;
    width: 50%;
    padding: 2px;
    cursor: pointer;
  }
  .final-screen .success {
    background-color: rgba(25, 216, 167, .4);
    color: rgb(25, 216, 167);
  }
  .final-screen .failure {
    background-color: rgba(216, 25, 74, .4);
    color: rgb(216, 25, 74);
  }
  .restart-button {
    background-color: blue;
    color: white;
    border: none;
    padding: 5px;
    font-size: 14px;
    margin: 20px;
    cursor: pointer;
  }
</style>
