pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS=credentials('docker-hub-cred')
    }
    
    stages {
        stage('1-Checkout from git') {
            steps {
                echo '1 - Checkout project'
                git branch: 'master', url:'https://github.com/ArJau/serverAPI.git'
				//git branch: 'master', url:'git@github.com:ArJau/serverAPI.git'
            }
        }
		stage('2-Changer pour la prod') {
            steps {
                echo '2 - Changer pour la prod'
				sh 'whoami'
				sh 'sudo chmod 700 prod.sh'
                sh './prod.sh'
            }
        }
        
        stage('5-Nettoyage des containers') {//suppression des anciens containers de la machine docker de test(192.168.33.11) et de la machine jenkins
            steps {
                echo 'Clean docker image and container'
                sh 'ssh -v -o StrictHostKeyChecking=no vagrant@192.168.33.11 sudo docker stop api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no vagrant@192.168.33.11 sudo docker rm api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no vagrant@192.168.33.11 sudo docker rmi jaujau31/api-transport || true'
                sh 'docker rmi api-transport || true'
            }
            
        } 
        stage('6-Docker build') {
            steps {
                echo 'Docker Build'
                sh 'docker build -t api-transport . ' //lance le container sur le docker de test
            }
            
        }
        
        stage('7-Tag image') {
            steps {
                echo '9 - Tag image'
                sh 'docker tag api-transport jaujau31/api-transport'     
            }
            
        }
        stage('8-Login dockerhub') {
            steps {
                echo '10 - Login dockerhub'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'     
            }
            
        }
        stage('9-Push image dockerhub') {
            steps {
                echo '11 - Push image dockerhub'
                sh 'docker push jaujau31/api-transport'   
            }
        }
        stage('10-Run Container to local') {
            steps {
                echo 'Docker run'
                sh 'ssh -v -o StrictHostKeyChecking=no vagrant@192.168.33.11 sudo docker run -d --name api-transport -p8080:8080 jaujau31/api-transport'   
            }
            
        }
        
        stage ('11-Deploy To Prod AWS'){
              input{
                message "Do you want to proceed for production deployment?"
              }
            steps {
                sh 'echo "Deploy into Prod"'
                sh 'ssh -v -o StrictHostKeyChecking=no ubuntu@35.180.43.114 sudo docker stop api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no ubuntu@35.180.43.114 sudo docker rm api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no ubuntu@35.180.43.114 sudo docker rmi jaujau31/api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no ubuntu@35.180.43.114 sudo docker run -d --name api-transport -p8080:8080 jaujau31/api-transport'   
            

            }
        }

    }
    post {
        always {
            sh 'docker logout'
        }
    }
}
