const maxDepth = 4;

let counter = 1;

// 
const dataTree = [
    [
        [
            [3, 17], 
            [2, 12]
        ],
        [
            [15], 
            [25, 0]
        ]
    ],
    [
        [
            [2, 5],
            [3]
        ],
        [
            [2, 14]
        ]
    ]
]

class Node {
    constructor(data, type, depth, alpha, beta) {
        this.data = data;
        this.type = type; // 区分此节点的种类是 max 或 min
        this.depth = depth;

        this.alpha = alpha || -Infinity;
        this.beta = beta || Infinity;
    }

    score() {
        // 到达了最大深度后，此时的 data 是数组最内层的数字
        if (this.depth >= 4) {
            // console.log(`正在处理第 ${this.depth} 层的第 ${i} 个节点，其值为 ${childScore}` );
            return this.data;
        }


        // 对于 max 节点，返回的是子节点中的最大值，设置 alpha 值
        if (this.type === 'max') {
            let maxScore = -1000;
            let maxIndex = 0;

            for (let i = 0; i < this.data.length; i++) {
                const d = this.data[i];
                const childNode = new Node(d, changeType(this.type), this.depth + 1, this.alpha, this.beta);
                const childScore = childNode.score();
                // console.log(childScore);

                if (childScore > maxScore) {
                    maxScore = childScore;
                    maxIndex = i;
                    this.alpha = maxScore;
                }

                if (this.alpha >= this.beta) {
                    break;
                }
            }

            return maxScore;
        }

        // 对于 min 节点，返回的是子节点中的最小值
        else if (this.type === 'min') {
            let minScore = 1000;
            let minIndex = 0;
        
            for (let i = 0; i < this.data.length; i++) {
                const d = this.data[i];
                const childNode = new Node(d, changeType(this.type), this.depth + 1, this.alpha, this.beta);
                const childScore = childNode.score();
                // console.log(childScore);

                if (childScore < minScore) {
                    minScore = childScore;
                    minIndex = i;
                    this.beta = minScore;
                }

                if (this.alpha >= this.beta) {
                    break;
                }
            }


            return minScore;
        }
    }
}

function changeType(type) {
    return type === 'max' ? 'min' : 'max';
}

const testNode = new Node(dataTree, 'max', 0);

console.log(testNode.score());
