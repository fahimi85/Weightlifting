import debug from "debug";
const ReporterLog: debug.Debugger = debug("app:Reporter :");
const finishedround: debug.Debugger = debug("app:finished Weightlifter :");
const Targettable: debug.Debugger = debug("app:TargetTable :");
const Target: debug.Debugger = debug("app:Target :");
const Renewedround: debug.Debugger = debug("app:Renewedround :");
const Ranking: debug.Debugger = debug("app:Ranking :");
const FinalRanking: debug.Debugger = debug("app:FinalRanking :");

class Weightlifter {
    name: string = ""
    log: debug.Debugger;
    power: number = 0;
    Nationality: string = ""
    age: number = 0;
    Target: number[];
    resultTarget: string[][];
    round: number;
    Success: boolean[]
    recored: number

    constructor(name: string, Nationality: string) {
        this.name = name;
        this.log = debug(`app:Weightlifter:${this.name}`);
        this.Nationality = Nationality;
        this.age = Math.floor(Math.random() * 20 + 15);
        this.Target = [Math.floor(Math.random() * 50 + 150), Math.floor(Math.random() * 50 + 150), Math.floor(Math.random() * 50 + 150)]
        this.resultTarget = []
        this.Success = [true, true, true]
        this.recored = 0
        this.round = 1
    }

    roundPLUS(fromWho: Weightlifter) {
        this.round++;
    }
}
function sleep(sleepTime: number) {
    (function () {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepTime);
    })();
}
function sortbytarget(Weightlifters: Weightlifter[]) {
    for (var i = 0; i < Weightlifters.length; i++) {
        for (var j = i + 1; j < Weightlifters.length; j++) {
            if (Weightlifters[i].Target[Weightlifters[i].round - 1] > Weightlifters[j].Target[Weightlifters[j].round - 1]) {
                var c = Weightlifters[j]
                Weightlifters[j] = Weightlifters[i]
                Weightlifters[i] = c
            }

        }
    }
}
function setSuccesANDrecored(item: Weightlifter) {
    var counter: number = 0
    item.resultTarget[item.round - 1].forEach(item => {
        if (item == "RED") {
            counter++
        }
    })
    if (counter > 1) {
        item.Success[item.round - 1] = false
    } else {
        item.Success[item.round - 1] = true
        item.recored = item.Target[item.round - 1]
    }
}
function initialTarget(Weightlifters: Weightlifter[]) {
    Weightlifters.forEach((item) => {
        item.roundPLUS(item)
        while (item.Target[item.round - 1] < item.recored) {
            item.Target[item.round - 1] = Math.floor(Math.random() * 50 + 150)
        }
    })
}
function sortbyrecord(Weightlifters: Weightlifter[]) {
    for (var i = 0; i < Weightlifters.length; i++) {
        for (var j = i + 1; j < Weightlifters.length; j++) {
            if (Weightlifters[i].recored < Weightlifters[j].recored) {
                var c = Weightlifters[j]
                Weightlifters[j] = Weightlifters[i]
                Weightlifters[i] = c
            }
        }
    }
}
function sortbyround(Weightlifters: Weightlifter[]) {
    for (var i = 0; i < Weightlifters.length; i++) {
        for (var j = i + 1; j < Weightlifters.length; j++) {
            if (Weightlifters[i].round < Weightlifters[j].round) {
                var c = Weightlifters[j]
                Weightlifters[j] = Weightlifters[i]
                Weightlifters[i] = c
            }
        }
    }
}
function countroundthree(Weightlifters: Weightlifter[]) {
    var counter: number = 0
    Weightlifters.forEach(item => {
        if (item.round == 3) {
            counter++
        }
    })
    return counter
}
function endedANDindexItmRndBgrthanthree(item: Weightlifter, exitcopmlex: Weightlifter[]) {
    if (item.round > 2) {
        finishedround(`${item.name} ended its work`)
        exitcopmlex.push(item)
        sleep(2000)
    }
}
function SpliceItmRndBgrthanthree(Weightlifters: Weightlifter[]) {
    sortbyround(Weightlifters)
    Weightlifters.splice(0, countroundthree(Weightlifters))
}
async function startWeightliftingGame(timeout = 3) {
    ReporterLog("Weightlifting is going to be started... ");
    const interval = setInterval(async () => {
        ReporterLog(`In ${timeout--}`);
        if (timeout < 0) {
            clearInterval(interval);
            ReporterLog("Started !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
            const Weightlifter1 = new Weightlifter("Weightlifter1", "IRAN");
            const Weightlifter2 = new Weightlifter("Weightlifter2", "IRAQ");
            const Weightlifter3 = new Weightlifter("Weightlifter3", "Poland");
            const Weightlifter4 = new Weightlifter("Weightlifter4", "Lithuania");
            const Weightlifter5 = new Weightlifter("Weightlifter5", "Georgia");
            ReporterLog("Ladies and gentlemen, we introduce the weightlifters participating in this competition:");
            sleep(2000)
            var Weightlifters: Weightlifter[] = [Weightlifter1, Weightlifter2, Weightlifter3, Weightlifter4, Weightlifter5]
            Weightlifters.forEach((item) => {
                ReporterLog(`${item.name} from ${item.Nationality} & his age ${item.age}`);
                sleep(2000)
            })
            sleep(2000)
            var iteration: number = 0
            var exitcopmlex: Weightlifter[] = []
            var totalranking: Weightlifter[] = []
            while (Weightlifters.length > 0) {
                if (iteration == 0) {
                    sortbytarget(Weightlifters)
                }
                else if (iteration != 0) {
                    initialTarget(Weightlifters)
                    sortbytarget(Weightlifters)
                }
                ReporterLog('Weightlifters, with the help of their coaches, target new weights :')
                Weightlifters.forEach((item) => {
                    Targettable(`${item.name} from ${item.Nationality} & Target: ${item.Target[item.round - 1]} kg`);
                    sleep(2000)
                })
                Weightlifters.forEach((item) => {
                    ReporterLog(`${item.name} is preparing to lift ${item.Target[item.round - 1]} kg`);
                    sleep(2000)
                    var TargetRandom: string[][] = [["RED", "RED", "RED"], ["RED", "White", "White"], ["White", "White", "White"]]
                    item.resultTarget[item.round - 1] = TargetRandom[Math.floor(Math.random() * TargetRandom.length)]
                    Target(`${item.name} Target & result is ${item.resultTarget[item.round - 1].join(" ")} `);
                    setSuccesANDrecored(item)
                    endedANDindexItmRndBgrthanthree(item, exitcopmlex)
                    sleep(2000)
                    while (item.Success[item.round - 1] == false && item.round < 3) {
                        item.roundPLUS(item)
                        item.Target[item.round - 1] = item.Target[item.round - 2]
                        item.resultTarget[item.round - 1] = TargetRandom[Math.floor(Math.random() * TargetRandom.length)]
                        Renewedround(`${item.name} Target in round ${item.round} & result is ${item.resultTarget[item.round - 1].join(" ")} `)
                        sleep(2000)
                        setSuccesANDrecored(item)
                        endedANDindexItmRndBgrthanthree(item, exitcopmlex)
                    }
                })
                SpliceItmRndBgrthanthree(Weightlifters)
                totalranking = Weightlifters.concat(exitcopmlex)
                sortbyrecord(totalranking)
                ReporterLog("Weightlifting rankings so far:");
                var i = 1
                totalranking.forEach((item) => {
                    Ranking(`${i}: ${item.name} from ${item.Nationality}  ${item.resultTarget.join(" / ")}  Record ${item.recored} ,Has played ${item.round} rounds. ${3 - item.round} chance left.`);
                    i++
                    sleep(2000)
                })


                iteration++


            }
            ReporterLog("Game is finished & final Ranking is:");
            var i: number = 1
            totalranking.forEach((item) => {
                FinalRanking(` ${i}: ${item.name}  Targets: ${item.Target[0]}=>${item.Success[0]} , ${item.Target[1]}=>${item.Success[1]} , ${item.Target[2]}=>${item.Success[2]}   Recored: ${item.recored}`)
                i++
            })

        }

    }, 1500);
}

startWeightliftingGame();