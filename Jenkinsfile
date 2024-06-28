pipeline {
    agent any 
   
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(10) {
                    git branch: 'main', url: 'https://github.com/sasandamanahara/TourWeb'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker build -t sasandamanahara/tourweb-frontend:%BUILD_NUMBER%  frontend'
                    bat 'docker build -t sasandamanahara/tourweb-backend:%BUILD_NUMBER%  backend'

                }
            }
        }
        stage('Login to Docker Hub') {
    steps {
        withCredentials([string(credentialsId: 'docker_pwd', variable: 'Dockerhub')]) {
            bat "docker login -u sasandamanahara -p ${Dockerhub}"
        }
    }
}

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    bat 'docker-compose up -d'
                }
            }
        }

    }
    post {
        always {
            bat 'docker logout'
        }
    }
}
