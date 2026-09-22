pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '''
                    buildctl build \
                        --frontend dockerfile.v0 \
                        --local context=. \
                        --local dockerfile=. \
                        --output type=oci,dest=/tmp/my-image.tar
                '''
            }
        }

    }
}
