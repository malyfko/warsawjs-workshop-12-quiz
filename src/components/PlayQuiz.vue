<template>
  <div class="quiz">
    <div class="question">
      {{ getQuestion }}
    </div>
    <ul class="answers-list">
      <li class="answer" v-for="(answer, index) in getAnswers" v-on:click="goToNextQuestion(index)">
        {{ answer }}
      </li>
    </ul>
    <div class="">Correct answers: {{ correctAnswers }}/{{ getAnswers.length - 1 }}</div>
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
      getSingleQuiz() { return this.quizzes[this.currentQuizIndex] },
      getCurrentQuestion() { return this.questions[this.currentQuestionIndex] },
      getQuestion() { return this.getCurrentQuestion.text; },
      getAnswers() { return this.getCurrentQuestion.answers },
    },
    methods: {
      increaseStep() { this.currentQuestionIndex++ },
      increaseCorrectAnswers() { this.correctAnswers++ },
      setGameStatus(status) { this.gameStatus = status; console.log(status); },
      goToNextQuestion(index) {
        if (index === this.getCurrentQuestion.correctAnswerIndex){
          this.correctAnswers++;
        }
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.increaseStep();
        } else {
          console.log('bla');
          this.setGameStatus('end');
        }
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
</style>
