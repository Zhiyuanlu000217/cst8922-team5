# Step 5: Optimize the performance

In this part, we provide a initial server, that had an algorithm currently have time complexity of O(n^2), which can be optimized to O(n), we will use copilot `agent` mode to let it fully optimize our algorithm, create canaray deployments, reading console output and compare the performance, finally, give suggestions to rollback or use the new deployment.

The canary deployment and optimized algorithm is not included, if you wish to see the result, please go to my [working repo](https://github.com/Zhiyuanlu000217/cst8922-demo/tree/optimize_performance)

prompt 

```
The docker username is "zeelu1", make sure you use current set in deployment.yml and Dockerfile.(Note that make sure you replicate the set in Dockerfile, and do minimal change)

Currently, my server's api/stress endpoint's performance is under my expectation, I wish you to optimize the function, and then create a new set of code, including new server, new Dockerfile, and new k8s deployment, do canary deployment, and then compare the performance by using proper command. If the fix is valid, proceed, otherwise rollback.
``