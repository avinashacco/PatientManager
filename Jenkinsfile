pipeline {
  agent any
  stages {
    stage('npm-install') {
      steps {
        sh 'npm install'
      }
    }
    stage('bower-install') {
      steps {
        sh 'bower install'
      }
    }
  }
}