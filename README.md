# cst8922-demo

If you wish to see my initial works, failures, please go to repository: https://github.com/Zhiyuanlu000217/cst8922-demo

## Before we start

> [!Note] 
> All the resources used in this demo are free or provide free tier.

Make sure you have the following resources ready:
- Node.js (version >= v20.18.3)
- Valid Azure subscription ([AKS](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli) will be required in this demo)
- Github Account
- Github Copilot access
- Docker + Docker Hub account
- VSCode + [Copilot Plugin](https://code.visualstudio.com/docs/copilot/setup)
- kubernetes (we are using v1.32.2)
- Azure CLI (use command `az account show` to make sure you are logged in)
- Terraform (Optional)

Here's a quick walk-through for our github repository, which we will merge them one by one during the demo.

### Branches
- `main`:
    documentations and project set up

- `step1_basic_usage`:
    Step 1: Use Copilot to create basic cicd pipeline, kubernetes configures, Dockerfile.

- `step2_anti_pattern_detect`:
    Step 2: Use AI to detect code commits, and create issue to provide feedback.

- `step3_deprecated_deps_detect`:
    Step 3: Use AI to detect deprecated dependencies, and create issue to provide feedback.

- `step4_missing_probe`:
    Step 4: Use Copilot to detect anomolies, and automatically create probes to resolve the issue.

- `step5_optimize_performance`:
    Step 5: Use Copilot to automatically execute a series of commands, modify files, and comparing terminal output to optimize current setup

Each branch will contains their unique set of code for demo purpose.

### Project set up: Create AKS Cluster

You can create AKS Cluster either via Azure portal, or the provided terraform config files. The basic configuration are listed below:

- Region: Canada Central
- Kubernetes version: 1.31.8
- Cluster preset configuration: Dev/Test
- Avaliable Zones: None
- AKS pricing tier: Free
- Automatic upgrade: None
- Node security channel type: None 
- Node pool:
    - 1 master node with:
        - Ubuntu Linux
        - Standard_D2s_v3
        - No Avaliable zones
        - Manual Scale with 1 node + 110 max pods per node

To create with terraform, do following:

- `cd terraform`
- `terraform init`
- `terraform plan`
- `terraform apply -auto-approve` - this might take a while, in my case, 
- At this step, you have to options:
    - go to azure portal > kuberenetes services > connect, and grab the command "Download cluster credentials"
    - Or, you can use the provided bash under terraform folder, make it executable by `chmod +x get-kubeconfig.sh`, and then run it by `./get-kubeconfig.sh`

    Either way will add the context to kubernets, then use command `kubectl config use-context <your_aks_context>` to switch to the context, you can verify by checking the namespaces using command `kubectl get ns`, it will show `default`, `kube-node-lease`, `kube-public` and `kube-system`.

Now, we are ready for [part 1](https://github.com/Zhiyuanlu000217/cst8922-team5/tree/step1_basic_usage)!

> [!Warning]
> Regardless you are going to finish this or not, always remember delete your azure resources created.
