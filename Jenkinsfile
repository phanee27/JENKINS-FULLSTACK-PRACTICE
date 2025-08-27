pipeline {
    agent any

    stages {
        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('FRONTEND/library') {
                    sh '''
                    export PATH="/usr/local/bin:$PATH"

                    node -v
                    npm -v

                    npm install
                    npm run build
                    '''
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                sh '''
                TOMCAT_DIR="/Users/phanee/3-1 semester/Softwares/apache-tomcat-10.1.43/webapps/reactlibraryapi"

                if [ -d "$TOMCAT_DIR" ]; then
                    rm -rf "$TOMCAT_DIR"
                fi

                mkdir -p "$TOMCAT_DIR"
                cp -R FRONTEND/library/dist/* "$TOMCAT_DIR"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('BACKEND/SpringBootLibraryProject') {
                    sh '''
                    export PATH="/opt/maven/bin:$PATH"
                    mvn clean package
                    '''
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                sh '''
                TOMCAT_WEBAPPS="/Users/phanee/3-1 semester/Softwares/apache-tomcat-10.1.43/webapps"
                WAR_FILE="$TOMCAT_WEBAPPS/springbootlibraryapi.war"
                WAR_DIR="$TOMCAT_WEBAPPS/springbootlibraryapi"

                if [ -f "$WAR_FILE" ]; then
                    rm -f "$WAR_FILE"
                fi

                if [ -d "$WAR_DIR" ]; then
                    rm -rf "$WAR_DIR"
                fi

                cp BACKEND/SpringBootLibraryProject/target/*.war "$TOMCAT_WEBAPPS/"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
