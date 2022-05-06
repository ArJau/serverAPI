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
            }
        }
		stage('2-Changer URL de prod') {
            steps {
                sh 'sed -i -E -r "s|.*CHANGE_URL.*|mongoDbUrl='$URL_MONGO_PROD';|g" connectionDb.js'
            }
        }
        
        stage('3-Nettoyage des containers') {//suppression des anciens containers de la machine docker de test(192.168.33.11) et de la machine jenkins
            steps {
                echo 'Clean docker image and container'
                sh 'ssh -v -o StrictHostKeyChecking=no vagrant@192.168.33.11 sudo docker stop api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no vagrant@192.168.33.11 sudo docker rm api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no vagrant@192.168.33.11 sudo docker rmi jaujau31/api-transport || true'
                sh 'docker rmi api-transport || true'
            }
            
        } 
        stage('4-Docker build') {
            steps {
                echo 'Docker Build'
                sh 'docker build -t api-transport . ' //lance le container sur le docker de test
            }
            
        }
        
        stage('5-Tag image') {
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
        stage('6-Push image dockerhub') {
            steps {
                echo '11 - Push image dockerhub'
                sh 'docker push jaujau31/api-transport'   
            }
        }
        stage('7-Run Container to local') {
            steps {
                echo 'Docker run'
                sh 'ssh -v -o StrictHostKeyChecking=no vagrant@192.168.33.11 sudo docker run -d --name api-transport -p8080:8080 jaujau31/api-transport'   
            }
            
        }
        
        stage ('8-Deploy To Prod AWS'){
              input{
                message "Do you want to proceed for production deployment?"
              }
            steps {
                sh 'echo "Deploy into Prod"'
                sh 'ssh -v -o StrictHostKeyChecking=no ubuntu@15.237.111.102 sudo docker stop api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no ubuntu@15.237.111.102 sudo docker rm api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no ubuntu@15.237.111.102 sudo docker rmi jaujau31/api-transport || true'
                sh 'ssh -v -o StrictHostKeyChecking=no ubuntu@15.237.111.102 sudo docker run -d --name api-transport -p8282:8282 jaujau31/api-transport'   
            }
        }

    }
    post {
        always {
            sh 'docker logout'
        }
    }
}
