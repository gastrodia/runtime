/**
 * 定义一个候选方案
 */
export class Particle {
    /** 位置 */
    public position;
    /** 速度 */
    public velocity;
    /** 最佳位置 */
    public bestPosition;
    /** 适应度 */
    public fitness;
    /** 最佳适应度 */
    public bestFitness;

    /** 惰性权重 */
    private _inertiaWeight;

    /** 社交权重 */
    private _social;

    /** 个性权重 */
    private _personal;
    public constructor(position, velocity, options) {
        this.position = position;
        this.velocity = velocity;
        this.bestPosition = new Array(this.position.length);
        this.fitness = -Infinity;
        this.bestFitness = -Infinity;

        this._inertiaWeight = options.inertiaWeight;
        this._social = options.social;
        this._personal = options.personal;
    }

    /**
     *  Stores the current position as its best so far.
     */
    public storePosition() {
        this.bestPosition = this.position.slice(0);
    }

    /**
     * Retrieves the particle's current position.
     */
    public getPosition() {
        return this.position.slice(0);
    }

    /**
     * Retrieves the particle's best saved position.
     */
    public getBestPosition() {
        return this.bestPosition.slice(0);
    }

    /**
     * 根据惰性、社会影响和个性 更新速度
     */
    public updateVelocity(globalBest, random) {
        this.position.forEach((component, index) => {
            var inertia = this.velocity[index] * this._inertiaWeight;
            var socialInfluence = (globalBest.position[index] - component) * random() * this._social;
            var personalInfluence = (this.bestPosition[index] - component) * random() * this._personal;

            this.velocity[index] = inertia + socialInfluence + personalInfluence;
        })
    }

    /**
     * 根据速度更新位置
     */
    public updatePosition() {
        this.velocity.forEach((component, index) => {
            this.position[index] += component;
        })
    }

    /**
     * 创建随机粒子
     */
    public static createRandom(domain, options, random) {
        var position = domain.map(function (interval) {
            return random() * (interval.end - interval.start) + interval.start;
        });

        var velocity = domain.map(function (interval) {
            return (random() * (interval.end - interval.start)) * 0.05;
        });

        return new Particle(position, velocity, options);
    }
}

/**
 *  An *Interval* is anything with a *start* and an *end*.
 */
export class Interval {
    public start;
    public end;
    constructor(start, end) {
        this.start;
        this.end;
    }
}

/**
 *  Holds particles and carries out the optimization task.
 */
export class Optimizer {

    /** 全部粒子 */
    private _particles: Array<Particle>;

    /** 观察函数：根据position计算出fitness */
    private _objectiveFunction: Function;

    /** 前一个最佳粒子 */
    private _bestPositionEver;

    /** 前一个最佳适应度 */
    private _bestFitnessEver;

    /** 选项 */
    private _options;

    /** 是否异步 */
    private _async: boolean;

    /** 是否在等待 */
    private _waiting: boolean;

    public rng;

    constructor() {
        this._particles = null;
        this._objectiveFunction = null;

        this._bestPositionEver = null;
        this._bestFitnessEver = -Infinity;

        this._options = {
            inertiaWeight: 0.8,
            social: 0.4,
            personal: 0.4,
            pressure: 0.5
        };

        this._async = false;
        this._waiting = false;

        this.rng = {
            random: Math.random,
            setSeed: function () { }
        };
    }

    public setOptions(options) {
        // + *inertiaWeight* - is multiplied every frame with the previous velocity;
        // takes values between 0 and 1
        if (options.inertiaWeight !== undefined) {
            this._options.inertiaWeight = options.inertiaWeight;
        }

        // + *social* dictates the influence of the best performing particle when updating particle velocities
        // takes values between 0 and 1
        if (options.social !== undefined) {
            this._options.social = options.social;
        }

        // + *personal* dictates the influence of a particle's best encountered position
        // takes values between 0 and 1
        if (options.personal !== undefined) {
            this._options.personal = options.personal;
        }

        // + *pressure* - bias in selecting the best performing particle in the swarm.
        // Takes values between 0 and 1; 0 meaning that the best is chosen randomly and 1 that
        // the actual best is computed at every iteration
        if (options.pressure !== undefined) {
            this._options.pressure = options.pressure;
        }
    }

    public setObjectiveFunction(objectiveFunction: Function, options?: any) {
        this._objectiveFunction = objectiveFunction;
        this._async = options && options.async;
    }

    public init(nParticles: number, generationOption) {
        var generator = generationOption instanceof Function ?
            generationOption :
            () => {
                return Particle.createRandom(generationOption, this._options, this.rng.random);
            };

        this._bestPositionEver = null;
        this._bestFitnessEver = -Infinity;

        this._particles = [];
        for (var i = 0; i < nParticles; i++) {
            this._particles.push(generator());
        }
    }


    /**
     * 随机获得最佳粒子
     */
    public _getRandomBest(except) {
        var ret = Math.floor(this.rng.random() * this._particles.length);
        //循环一下，结果尽可能优化
        this._particles.forEach((particle, index) => {
            if (
                this.rng.random() < this._options.pressure &&
                this._particles[index].fitness > this._particles[ret].fitness &&
                index !== except
            ) {
                ret = index;
            }
        });

        return ret;
    }

    /**
     * Iterate once;
     * *callback* is supplied only if the fitness function is asynchronous
     */
    public step(callback?:Function) {
        if (this._async) {
            if (this._waiting) {
                console.warn('Cannot step again before previous requests have been completed!');
                return;
            }
            this._waiting = true;
            var completed = 0;
            this._particles.forEach((particle) => {
                this._objectiveFunction(particle.position, (fitness) => {
                    particle.fitness = fitness;
                    completed++;
                    if (completed >= this._particles.length) {
                        this._waiting = false;
                        this._completeStep();
                        callback();
                    }
                });
            });
        } else {
            this._particles.forEach((particle) => {
                particle.fitness = this._objectiveFunction(particle.position);
            });
            this._completeStep();
        }
    }

    public _completeStep() {
        // Record the best found solutions
        this._particles.forEach((particle) => {
            if (particle.fitness > particle.bestFitness) {
                particle.bestFitness = particle.fitness;
                particle.storePosition();

                if (particle.fitness > this._bestFitnessEver) {
                    this._bestFitnessEver = particle.fitness;
                    this._bestPositionEver = particle.getPosition();
                }
            }
        });

        // Update velocities
        this._particles.forEach((particle, index) => {
            var randomBest = this._particles[this._getRandomBest(index)];
            particle.updateVelocity(randomBest, this.rng.random);
        });

        // Update positions
        this._particles.forEach((particle) => {
            particle.updatePosition();
        });
    }

    // Retrieves an array of all solutions in the swarm
    public getParticles() {
        return this._particles.map((particle) => {
            return {
                position: particle.getPosition(),
                fitness: particle.fitness,
                bestPosition: particle.getBestPosition(),
                bestFitness: particle.bestFitness
            };
        });
    }

    // Retrieves the best solution ever recorded
    public getBestPosition() {
        return this._bestPositionEver;
    }

    // Retrieves the best fitness ever recorded
    public getBestFitness() {
        return this._bestFitnessEver;
    }

    // Retrieves the mean fitness of the entire swarm
    public getMeanFitness() {
        var sum = this._particles.reduce(function (partialSum, particle) {
            return partialSum + particle.fitness;
        }, 0);
        return sum / this._particles.length;
    }
}