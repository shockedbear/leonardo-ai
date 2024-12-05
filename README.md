# Leonardo.ai test task
1. Copy `.env.dist` to `.env`
2. Run the following command to build a project
    ```bash
    docker-compose up -d --build
    ```
3. Once docker finished, go to http://localhost:3000/api
4. To run tests, run the following command:
   ```bash
   docker-compose exec app npm run test
   ```

