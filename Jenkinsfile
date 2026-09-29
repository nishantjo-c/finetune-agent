pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '''
                    buildctl build \
                        --frontend dockerfile.v0 \
                        --local context=./frontend \
                        --local dockerfile=./frontend \
                        --output type=image,name=ghcr.io/nishantjo-c/finetune-agent-frontend:42,push=true
                '''
            }
        }

    }
}
